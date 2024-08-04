import { getStore } from "@/store"
import { logger } from "../utils"
import { mediaActions } from "@/store/reudcers/media"

export default async function releaseVideo() {
  const store = getStore()
  const data = store.getState().media.local.video

  if (data) {
    data.getVideoTracks().forEach((t) => t.stop())
    logger.info("video released")
  }

  store.dispatch(mediaActions.setVideo({ video: null }))
}
