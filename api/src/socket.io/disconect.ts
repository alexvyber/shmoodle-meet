import type { Socket } from "socket.io"
import { Mediasoup } from "../mediasoup/index.js"
import { getIO } from "./index.js"
import { logger } from "../logger.js"

export function disconect({ socket, map }: { socket: Socket; map: Map<string, string> }) {
  logger.info(`a user disconnected: ${socket.id}`)

  for (const [uuid, socketId] of map.entries()) {
    if (socket.id === socketId) {
      map.delete(uuid)
    }

    if (Mediasoup.peers[Mediasoup.room[uuid]]) {
      delete Mediasoup.peers[Mediasoup.room[uuid]][uuid]
    }

    if (Mediasoup.activeProducers[Mediasoup.room[uuid]]) {
      let index = null

      do {
        index = Mediasoup.activeProducers[Mediasoup.room[uuid]].findIndex((e) => e.uuid === uuid)

        if (index !== -1) {
          Mediasoup.activeProducers[Mediasoup.room[uuid]].splice(index, 1)
          index = null
        }
      } while (index === null)
    }

    getIO().to(Mediasoup.room[uuid]).emit("peers", { peers: Mediasoup.peers[Mediasoup.room[uuid]] })
  }
}
