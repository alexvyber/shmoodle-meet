import { createWorker, getSupportedRtpCapabilities, type types } from "mediasoup"
import { createWebRtcTransport } from "./create-web-rtc-transport.js"
import { createConsumer } from "./create-consumer.js"
import { config } from "../config.js"
import { logger } from "../logger.js"

let worker: types.Worker
let router: types.Router

const init = async () => {
  worker = await createWorker({
    rtcMinPort: config.rtcMinPort,
    rtcMaxPort: config.rtcMaxPort,
    logLevel: config.mediasoupLogLevel,
  })

  worker.on("died", () => {
    logger.error("mediasoup worker died")
  })

  logger.info("mediasoup worker running")

  router = await worker.createRouter({ mediaCodecs: config.mediaCodecs })

  logger.info("mediasoup router online")
  logger.info(`mediasoup ip is ${config.ipAddress.ip}`)
}

const getWorker = () => worker

const getRouter = () => router

export const Mediasoup = {
  init,
  createWebRtcTransport,
  createConsumer,
  getWorker,
  getRouter,
  rtpCapabilities: getSupportedRtpCapabilities(),
  transports: {
    producer: [] as any as Record<string, types.WebRtcTransport>,
    consumer: [] as any as Record<string, types.WebRtcTransport>,
  },
  producers: {} as Record<string, any>,
  activeProducers: {} as Record<string, any[]>,
  consumers: {} as Record<string, any>,
  peers: {} as Record<string, any>,
  room: { "user-id": "room-key" } as Record<string, string>,
}
