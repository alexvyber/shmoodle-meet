import { logger } from "../logger.js"
import { getIO } from "./index.js"
import type { OnCallback } from "./types.js"

export const message: OnCallback = async ({ data, callback }) => {
  logger.info(JSON.stringify(data))

  getIO().to(data.key).emit("message", {
    uuid: data.uuid,
    content: data.content,
    username: data.username,
    email: data.email,
  })

  callback("some")
}
