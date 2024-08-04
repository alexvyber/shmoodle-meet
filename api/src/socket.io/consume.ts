import { logger } from "../logger.js"
import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const consume: OnCallback = async ({ data, callback }) => {
  if (!Mediasoup.producers[data.key]) {
    Mediasoup.producers[data.key] = {}
  }

  if (!Mediasoup.consumers[data.key]) {
    Mediasoup.consumers[data.key] = {}
  }

  if (!Mediasoup.transports.consumer[data.uuid]) {
    return callback({})
  }

  const { consumer, response } = await Mediasoup.createConsumer({
    router: Mediasoup.getRouter(),
    producer: Mediasoup.producers[data.key][data.producerId],
    rtpCapabilities: data.rtpCapabilities,
    transport: Mediasoup.transports.consumer[data.uuid],
  })

  if (!consumer) {
    return callback(response || {})
  }

  consumer.on("transportclose", async () => {
    try {
      await Mediasoup.consumers[data.key][consumer.id].close()
    } catch (e) {
      logger.error(e)
    }
  })

  consumer.on("producerclose", async () => {
    try {
      await Mediasoup.consumers[data.key][consumer.id].close()
    } catch (e) {
      logger.error(e)
    }
  })

  Mediasoup.consumers[data.key][consumer.id] = consumer
}
