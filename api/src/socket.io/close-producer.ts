import { Mediasoup } from "../mediasoup/index.js"
import { getIO } from "./index.js"
import type { OnCallback } from "./types.js"

export const closeProducer: OnCallback = async ({ data, callback }) => {
  getIO().emit("producer-close", data)

  if (!Mediasoup.activeProducers[data.key]) {
    Mediasoup.activeProducers[data.key] = []
  }

  const removeProducer = (id: string) => {
    const index = Mediasoup.activeProducers[data.key].findIndex((e) => e.id === id)

    if (index !== -1) {
      Mediasoup.activeProducers[data.key].splice(index, 1)
    }
  }

  removeProducer(data.id)

  callback()
}
