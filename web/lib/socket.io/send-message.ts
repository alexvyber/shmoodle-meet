import { DateTime } from "luxon"
import { socketRequest } from "./socket-io"
import { logger } from "../utils"

export default async function sendMessage(content: string) {
  // const state = useAppStore().getState()
  // const { uuid } =  state.media
  // const { key } =  state.meeting
  // const { username, email } =  state.user

  const uuid = "uuid"
  const key = "key"
  const username = "username"
  const email = "email"

  const data = { uuid, key, content, username, email, date: DateTime.now().toISODate() }

  logger.info("sending message", data)

  await socketRequest("message", data)
}
