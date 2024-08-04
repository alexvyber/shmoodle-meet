import { getStore } from "@/store"
import { logger } from "../utils"
import releaseVideo from "./release-video"
import { toast } from "sonner"
import { mediaActions } from "@/store/reudcers/media"

export default async function getVideo() {
  const store = getStore()
  const { device } = store.getState().media

  if (!device.canProduce("video")) {
    toast.error("can't access the camera")
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    store.dispatch(mediaActions.setVideo(stream))

    logger.info("video", stream.id)
  } catch (error) {
    releaseVideo()

    toast.error("video produce error")
    logger.info("video produce error", error)
  }
}
