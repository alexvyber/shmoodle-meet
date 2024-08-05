import { getStore } from "@/store"
import { logger } from "../utils"
import { mediaActions } from "@/store/reudcers/media"

export async function releaseAudio() {
  const store = getStore()
  const data = store.getState().media.audioStream

  if (data) {
    data.getAudioTracks().forEach((t) => t.stop())
    logger.info("audio released")
  }

  store.dispatch(mediaActions.setAudio(null))
}
