import { getErrorMessage } from "../get-error-message"
import { logger } from "../utils"

export async function canProduce(type: "audio" | "video") {
  try {
    const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
      (device) => device.kind?.startsWith(type) && device.kind.endsWith("input")
    )

    logger.info(`${type} devices: ${devices.map((device) => device.label).join(", ")}`)

    return devices.length > 0
  } catch (error) {
    logger.error(`can't get devices info: ${getErrorMessage(error)}`)

    return false
  }
}
