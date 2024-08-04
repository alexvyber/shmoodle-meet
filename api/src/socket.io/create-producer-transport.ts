import { logger } from "../logger.js"
import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const createProducerTransport: OnCallback = async ({ data, callback }) => {
  try {
    const { transport, params } = await Mediasoup.createWebRtcTransport({ router: Mediasoup.getRouter() })

    Mediasoup.transports.producer[data.uuid] = transport

    logger.info(`producer transport created: ${data.uuid}`)

    callback(params)
  } catch (error) {
    logger.error(error)
    if (error instanceof Error) {
      callback({ error: error.message })
    }
  }
}
