import { logger } from "../logger.js"
import type { types } from "mediasoup"

export async function createConsumer({
  router,
  producer,
  rtpCapabilities,
  transport,
}: {
  router: types.Router
  producer: types.Producer
  rtpCapabilities: types.RtpCapabilities
  transport: types.Transport
}) {
  if (!(producer && router.canConsume({ producerId: producer.id, rtpCapabilities }))) {
    logger.error("cant consume")
    return {}
  }

  let consumer

  try {
    consumer = await transport.consume({
      producerId: producer.id,
      rtpCapabilities,
      paused: producer.kind === "video",
    })
  } catch (error) {
    logger.error("consume failed", error)
    return {}
  }

  if (consumer.type === "simulcast") {
    await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2 })
  }

  return {
    consumer,
    response: {
      producerId: producer.id,
      id: consumer.id,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
      type: consumer.type,
      producerPaused: consumer.producerPaused,
    },
  }
}
