import { mediaActions } from "@/store/reudcers/media"
import { getStore } from "../../store"
import { logger } from "../utils"

export async function releaseScreen() {
  const store = getStore()
  const data = store.getState().media.local.screen

  if (data) {
    data.getVideoTracks().forEach((t) => t.stop())
    logger.info("video released")
  }

  store.dispatch(mediaActions.setScreen({ screen: null }))
}
