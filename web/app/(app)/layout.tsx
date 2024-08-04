"use client"

import { Toaster } from "sonner"
import { logger } from "@/lib/utils"
import { getStore } from "@/store"
import { chatActions } from "@/store/reudcers/chat"
import { socketActions } from "@/store/reudcers/socket"
import { useEffect } from "react"
import { toast } from "sonner"
import * as mediasoup from "mediasoup-client"
import { canProduce } from "@/lib/media/media-utils"
import { mediaActions } from "@/store/reudcers/media"
import getVideo from "@/lib/media/get-video"
import { socket, socketRequest } from "@/lib/socket.io/socket-io"
import getAudio from "@/lib/media/get-audio"

export default function AppLayout({ children }: React.PropsWithChildren) {
  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      // setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport: any) => {
        // setTransport(transport.name);
      })
    }

    function onDisconnect() {
      toast.info("server disconected")
    }

    function onWelcome(serverSocketId: string) {
      if (serverSocketId === socket.id) {
        const store = getStore()
        const { uuid } = store.getState().media

        logger.info("socket connected:", serverSocketId)
        toast.success(`connected to server, id: ${serverSocketId}`)

        store.dispatch(socketActions.openSocket({ id: serverSocketId }))

        socket.emit("uuid", uuid)
      } else {
        const description = `serverSocketId: ${serverSocketId}, socket.id: ${socket.id}`
        logger.error("socket.io ids don't match ", description)
        toast.error("error connecting to server ids don't match.  }", {
          description,
        })
      }
    }

    function onMessage(data: any) {
      const store = getStore()
      logger.info("message", data)
      store.dispatch(chatActions.newMessage({ message: data.content }))
    }

    async function onProducer(data: any) {
      logger.info("new producer", data)

      const { device, transports, uuid } = getStore().getState().media
      const { key } = getStore().getState().meeting

      const params = await socketRequest("consume", {
        producerId: data.id,
        uuid,
        rtpCapabilities: device.rtpCapabilities,
        key,
      })

      const consumer = await transports.consumer.consume(params)
      const stream = new MediaStream()

      stream.addTrack(consumer.track)

      await socketRequest("resume", { consumerId: consumer.id, key })

      //   dispatch({ type: "new-producer", producer: data, consumer, stream })
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    socket.on("welcome", onWelcome)
    socket.on("message", onMessage)

    socket.on("producer", onProducer)
    socket.on("producer-close", async (data: any) => {
      //   dispatch({ type: "producer-close", uuid: data.uuid, kind: data.kind })
    })

    socket.on("peers", async (data: any) => {
      //   dispatch({ type: "peers", peers: data.peers })
    })

    socket.on("connect-error", (e) => {
      toast.error(`socket.io could not connect to server ${e.toString()}`)
      logger.error("socket.io could not connect to server", e)
    })

    socket.on("reload", () => {
      window.location.reload()
    })

    socket.connect()

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("welcome", onWelcome)
      socket.off("message", onMessage)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    async function setupMedia() {
      const store = getStore()
      const device = new mediasoup.Device()

      const routerRtpCapabilities = (await socketRequest(
        "get-router-rtp-capabilities"
      )) as mediasoup.types.RtpCapabilities
      // console.log({ routerRtpCapabilities })

      routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions?.filter(
        (ext) => ext.uri !== "urn:3gpp:video-orientation"
      )

      await device.load({ routerRtpCapabilities })

      navigator.mediaDevices.ondevicechange = async () => {
        store.dispatch(
          mediaActions.setDevices({
            video: await canProduce("video"),
            audio: await canProduce("audio"),
          })
        )
      }

      store.dispatch(
        mediaActions.setDeviceReady({
          device,
          video: await canProduce("video"),
          audio: await canProduce("audio"),
        })
      )
      logger.info("mediasoup device ready")

      const { uuid } = store.getState().media

      const producerTransportParams = (await socketRequest("create-producer-transport", {
        uuid,
      })) as mediasoup.types.TransportOptions
      // console.log({ producerTransportParams })
      logger.info("producerTransportParams", producerTransportParams)

      const producerTransport = device.createSendTransport(producerTransportParams)
      logger.info("producer transport created")

      producerTransport.on("connect", async ({ dtlsParameters }, callback, error) => {
        logger.info("connecting producer", dtlsParameters, uuid)
        try {
          const res = await socketRequest("connect-producer-transport", {
            dtlsParameters,
            uuid,
          })
          callback()
        } catch (e) {
          error(new Error("ERR"))
        }
      })

      producerTransport.on("connectionstatechange", (state) => {
        switch (state) {
          case "connecting":
            logger.info("producer transport connecting")
            break

          case "connected":
            logger.info("producer transport connected")
            break

          case "failed": {
            logger.info("producer transport failed")
            producerTransport.close()
            break
          }

          default:
            logger.info(`producer transport ${state}`)
        }
      })

      producerTransport.on("produce", async ({ kind, rtpParameters, appData }, callback, error) => {
        const { username, email } = store.getState().user

        const { key } = store.getState().meeting

        try {
          const { id } = (await socketRequest("produce", {
            kind,
            rtpParameters,
            uuid,
            username,
            email,
            appData,
            key,
          })) as { id: string }

          logger.info(`producing ${kind}`)
          callback({ id })
        } catch (e) {
          error(new Error("ERR"))
        }
      })

      const consumerTransportParams = (await socketRequest("create-consumer-transport", {
        uuid,
      })) as mediasoup.types.TransportOptions

      logger.info("consumerTransportParams", consumerTransportParams)

      const consumerTransport = device.createRecvTransport(consumerTransportParams)

      logger.info("consumer transport created")

      consumerTransport.on("connect", async ({ dtlsParameters }, callback, error) => {
        logger.info("connecting consumer")

        try {
          await socketRequest("connectConsumerTransport", {
            dtlsParameters,
            uuid,
          })
          callback()
        } catch (e) {
          error(new Error("ERR"))
        }
      })

      consumerTransport.on("connectionstatechange", (state) => {
        switch (state) {
          case "connecting":
            logger.info("consumer transport connecting")
            break

          case "connected":
            logger.info("consumer transport connected")
            break

          case "failed": {
            logger.info("consumer transport failed")
            consumerTransport.close()
            break
          }

          default:
            logger.info(`consumer transport ${state}`)
        }
      })

      store.dispatch(mediaActions.setTransports({ producerTransport, consumerTransport }))

      await getVideo()
      await getAudio()
    }

    setupMedia()
  }, [])

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
