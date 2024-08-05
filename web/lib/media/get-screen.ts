import { mediaActions } from "@/store/reudcers/media"
import { logger } from "../utils"
import { releaseScreen } from "./release-screen"
import { getStore } from "@/store"
import { toast } from "sonner"

export async function getScreen() {
  const store = getStore()

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    store.dispatch(mediaActions.setScreen({ screen: stream }))

    logger.info("screen", stream.id)
  } catch (error) {
    releaseScreen()

    toast.error("screen produce error")
    logger.info("screen produce error", error)
  }
}
