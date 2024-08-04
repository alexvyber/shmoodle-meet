import { logger } from "../logger.js"
import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const connectProducerTransport: OnCallback = async ({ data, callback }) => {
  await Mediasoup.transports.producer[data.uuid].connect({ dtlsParameters: data.dtlsParameters })

  logger.info(`producer transport connected: ${data.uuid}`)

  callback()
}
