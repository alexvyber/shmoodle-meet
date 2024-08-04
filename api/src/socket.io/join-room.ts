import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const joinRoom: OnCallback = ({ socket, data, callback }) => {
  if (!data?.key) {
    callback(null)
  }

  if (data?.key) {
    socket.join(data.key)

    Mediasoup.room[data.uuid] = data.key

    callback(data.key)
  }
}
