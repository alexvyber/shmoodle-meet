"use client"

import { useAppSelector } from "@/hooks/use-store"
import getVideo from "@/lib/media/get-video"
import releaseVideo from "@/lib/media/release-video"
import { cx } from "cvax"
import { VideoIcon, VideoOffIcon } from "lucide-react"

const iconSizing = "w-[22px] h-[22px]"
const buttonSizing = "w-10 h-10"

export function VideoToggle() {
  const isAvailable = useAppSelector((state) => state.media.devices.video)
  const isActive = useAppSelector((state) => !!state.media.local.video)

  return (
    <button
      onClick={() => (isActive ? releaseVideo() : getVideo())}
      disabled={!isAvailable}
      className={cx(
        buttonSizing,
        isActive ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-500  hover:bg-red-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {isActive ? <VideoIcon className={iconSizing} /> : <VideoOffIcon className={iconSizing} />}
    </button>
  )
}
