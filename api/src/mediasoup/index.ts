import mediasoup from "mediasoup"
import { createWebRtcTransport } from "./create-web-rtc-transport.js"

import { config } from "../config.js"
import { logger } from "../logger.js"

let worker: mediasoup.types.Worker<mediasoup.types.AppData>
let router: mediasoup.types.Router<mediasoup.types.AppData>

const init = async () => {
  worker = await mediasoup.createWorker({
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

const Mediasoup = {
  init,
  createWebRtcTransport,

  getWorker,
  getRouter,
  rtpCapabilities: mediasoup.getSupportedRtpCapabilities(),
  transports: { producer: [], consumer: [] },
  producers: {},
  activeProducers: [],
  consumers: {},
  peers: {},
  room: { "user-id": "room-key" },
}

export default Mediasoup
