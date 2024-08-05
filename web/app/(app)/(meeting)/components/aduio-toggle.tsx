"use client"

import { useAppSelector } from "@/hooks/use-store"
import { getAudio } from "@/lib/media/get-audio"
import { releaseAudio } from "@/lib/media/release-audio"
import { cx } from "cvax"
import { MicIcon, MicOffIcon } from "lucide-react"

const iconSizing = "w-[22px] h-[22px]"
const buttonSizing = "w-10 h-10"

export function AudioToggle() {
  const isAvailable = useAppSelector((state) => state.media.devices.audio)
  const isActive = useAppSelector((state) => !!state.media.audioStream)

  return (
    <button
      onClick={() => (isActive ? releaseAudio() : getAudio())}
      disabled={!isAvailable}
      className={cx(
        buttonSizing,
        isActive ? "bg-white hover:bg-zinc-200" : "bg-red-500 hover:bg-red-600",
        " transition duration-200 rounded-full flex justify-center items-center shadow"
      )}
    >
      {isActive ? <MicIcon className={iconSizing} /> : <MicOffIcon className={cx(iconSizing, "text-white")} />}
    </button>
  )
}
