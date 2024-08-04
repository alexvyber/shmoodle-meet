// import "./server-node.js"
// import "./server.js"

import express from "express"
import cors from "cors"
import { logger } from "./logger.js"
import { createServer } from "node:http"
import { config } from "./config.js"
import { SocketIO } from "./socket.io/index.js"
import { Mediasoup } from "./mediasoup/index.js"

const app = express()
const server = createServer(app)
app.use(cors())

SocketIO.init({ server })
Mediasoup.init()

server.listen(config.port, () => logger.info(`server listening on port: ${config.port}`))
