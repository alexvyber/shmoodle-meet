import { logger } from "../logger.js"
import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const connectConsumerTransport: OnCallback = async ({ data, callback }) => {
  await Mediasoup.transports.consumer[data.uuid].connect({ dtlsParameters: data.dtlsParameters })

  logger.info(`consumer transport connected: ${data.uuid}`)

  callback()
}
