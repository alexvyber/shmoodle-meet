import { logger } from "../utils"
import releaseAudio from "./release-audio"
import { getStore } from "@/store"
import { toast } from "sonner"
import { mediaActions } from "@/store/reudcers/media"

export default async function getAudio() {
  const store = getStore()
  const { device } = store.getState().media

  if (!device.canProduce("audio")) {
    toast.error("can't access the camera")
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    store.dispatch(mediaActions.setAudio(stream))

    logger.info("audio", stream.id)
  } catch (error) {
    releaseAudio()

    toast.error("audio produce error")
    logger.info("audio produce error", error)
  }
}
