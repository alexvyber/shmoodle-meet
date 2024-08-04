import pino from "pino"

export function isNotNull<T>(some: T): some is NonNullable<T> {
  if (!some && typeof some === "object") return false
  return true
}

export const logger = pino({
  level: "error",
})

export { default as genRoomKey } from "./gen-room-key"
