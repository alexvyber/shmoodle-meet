import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const resume: OnCallback = async ({ data, callback }) => {
  if (!Mediasoup.consumers[data.key]) {
    Mediasoup.consumers[data.key] = {}
  }

  await Mediasoup.consumers[data.key][data.consumerId].resume()

  callback()
}
