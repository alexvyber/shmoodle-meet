import { Mediasoup } from "../mediasoup/index.js"
import { getIO } from "./index.js"
import type { OnCallback } from "./types.js"

export const leave: OnCallback = async ({ data, callback }) => {
  if (!Mediasoup.peers[data.key]) {
    Mediasoup.peers[data.key] = {}
  }

  if (!Mediasoup.activeProducers[data.key]) {
    Mediasoup.activeProducers[data.key] = []
  }

  delete Mediasoup.peers[data.key][data.uuid]

  let index = null

  do {
    index = Mediasoup.activeProducers[data.key].findIndex((e) => e.uuid === data.uuid)

    if (index !== -1) {
      Mediasoup.activeProducers[data.key].splice(index, 1)
      index = null
    }
  } while (index === null)

  getIO().to(data.key).emit("peers", { peers: Mediasoup.peers[data.key] })

  callback({ peers: Mediasoup.peers[data.key] })
}
