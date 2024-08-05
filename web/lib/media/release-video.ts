import { getStore } from "@/store"
import { logger } from "../utils"
import { mediaActions } from "@/store/reudcers/media"

export async function releaseVideo() {
  const store = getStore()
  const data = store.getState().media.videoStream

  if (data) {
    data.getVideoTracks().forEach((t) => t.stop())
    logger.info("video released")
  }

  store.dispatch(mediaActions.setVideo(null))
}
