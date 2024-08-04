import { Server } from "socket.io"
import { logger } from "../logger.js"
import { disconect } from "./disconect.js"
import { join } from "./join.js"
import { message } from "./message.js"
import { leave } from "./leave.js"
import { resume } from "./resume.js"
import { consume } from "./consume.js"
import { produce } from "./produce.js"
import { connectConsumerTransport } from "./connect-consumer-transport.js"
import { connectProducerTransport } from "./connect-producer-transport.js"
import { createConsumerTransport } from "./create-consumer-transport.js"
import { createProducerTransport } from "./create-producer-transport.js"
import { getRouterRtpCapabilities } from "./get-router-rtp-capabilities.js"
import { closeProducer } from "./close-producer.js"
import { joinRoom } from "./join-room.js"

import type { createServer } from "node:http"
import type { CustomIO } from "./types.js"

let io: CustomIO
const map = new Map<string, string>()

const init = ({ server }: { server: ReturnType<typeof createServer> }) => {
  io = new Server(server, { cors: { origin: "*" } }) as any as CustomIO

  io.on("connection", (socket) => {
    logger.info(`a user connected: ${socket.id}`)

    socket.emit("welcome", socket.id)

    socket.on("uuid", (uuid) => map.set(uuid, socket.id))
    socket.on("join-room", (data, callback) => joinRoom({ socket, data, callback }))
    socket.on("close-rroducer", (data, callback) => closeProducer({ socket, data, callback }))
    socket.on("get-router-rtp-capabilities", (data, callback) => getRouterRtpCapabilities({ socket, data, callback }))
    socket.on("create-producer-transport", (data, callback) => createProducerTransport({ socket, data, callback }))
    socket.on("create-consumer-transport", (data, callback) => createConsumerTransport({ socket, data, callback }))
    socket.on("connect-producer-pransport", (data, callback) => connectProducerTransport({ socket, data, callback }))
    socket.on("connect-consumer-transport", (data, callback) => connectConsumerTransport({ socket, data, callback }))
    socket.on("produce", (data, callback) => produce({ socket, data, callback }))
    socket.on("consume", (data, callback) => consume({ socket, data, callback }))
    socket.on("resume", (data, callback) => resume({ socket, data, callback }))
    socket.on("leave", (data, callback) => leave({ socket, data, callback }))
    socket.on("message", (data, callback) => message({ socket, data, callback }))
    socket.on("join", (data, callback) => join({ socket, data, callback }))
    socket.on("disconnect", () => disconect({ socket, map }))
  })

  logger.info("socket.io listening for events")
}

export const getIO = () => io

export const SocketIO = { init, getIO }
