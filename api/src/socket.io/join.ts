import { Mediasoup } from "../mediasoup/index.js"
import { getIO } from "./index.js"
import type { OnCallback } from "./types.js"

export const join: OnCallback<{ key: string; uuid: string; username: string; email: string }> = async ({
  data,
  callback,
}) => {
  if (!(data.key in Mediasoup.peers)) {
    Object.assign(Mediasoup.peers, { [data.key]: {} })
  }

  if (!(data.key in Mediasoup.activeProducers)) {
    Object.assign(Mediasoup.activeProducers, { [data.key]: [] })
  }

  Mediasoup.peers[data.key][data.uuid] = { username: data.username, email: data.email }

  getIO().to(data.key).emit("peers", { peers: Mediasoup.peers[data.key] })

  callback({ peers: Mediasoup.peers[data.key] })
}
