"use client"

import { logger } from "@/lib/utils"
import { useRef, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import { useAppStore } from "./use-store"

type SocketConfig =
  | {
      host?: string
      port?: string | number
      url?: never
    }
  | {
      url?: string
      host?: never
      port?: never
    }

export function useSocket(config?: SocketConfig) {
  const url = config?.url ? config.url : `${config?.host}/${config?.port}`

  const { uuid } = useAppStore().getState().media
  const { key } = useAppStore().getState().meeting

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (socketRef.current) return

    const socket = io(config?.url, {
      //   autoConnect: false,
    })

    function onWelcome(serverSocketId: string) {
      if (serverSocketId === socket.id) {
        logger.info("socket.io connected", serverSocketId)
        // dispatch({ type: "socket", id: serverSocketId })
        // dispatch({ type: "snack", severity: "success", content: "connected to server" })
        socket.emit("uuid", uuid)
      } else {
        logger.error("socket.io ids don't match", serverSocketId, socket.id)
        // dispatch({ type: "snack", severity: "error", content: "could not connect to server" })
      }
    }

    function onMessage(data: any) {
      //   const { uuid } = store.getState().media
      //   if (uuid !== data.uuid) {
      // logger.info("message", data)
      // dispatch({ type: "message", message: data })
      //   }
    }

    async function onProducer(data: any) {
      // logger.info("new producer", data)
      // const { device, transports, uuid } = store.getState().media
      // const { key } = store.getState().meeting
      // const params = await socketRequest("consume", {
      //   producerId: data.id,
      //   uuid,
      //   rtpCapabilities: device.rtpCapabilities,
      //   key,
      // })
      // const consumer = await transports.consumer.consume(params)
      // const stream = new MediaStream()
      // stream.addTrack(consumer.track)
      // await socketRequest("resume", { consumerId: consumer.id, key })
      // dispatch({ type: "new-producer", producer: data, consumer, stream })
    }

    socket.on("welcome", onWelcome)
    socket.on("message", onMessage)

    socket.on("producer", onProducer)
    socket.on("producer-close", async (data) => {
      //   dispatch({ type: "producer-close", uuid: data.uuid, kind: data.kind })
    })

    socket.on("peers", async (data) => {
      //   dispatch({ type: "peers", peers: data.peers })
    })

    socket.on("connect-error", (e) => {
      logger.error("socket.io could not connect to server", e)
      //   dispatch({ type: "snack", severity: "error", content: "could not connect to server" })
    })

    socket.on("reload", () => {
      window.location.reload()
    })

    socket.connect()

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socket.off("welcome", onWelcome)
      socket.off("message", onMessage)
    }
  }, [config])

  return socketRef
}
