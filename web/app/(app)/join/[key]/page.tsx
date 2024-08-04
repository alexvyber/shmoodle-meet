"use client"

import { LocalVideo } from "@/components/common/video"
import { VideoToggle } from "../../(meeting)/components/video-toggle"

export default function JoinPage() {
  return (
    <div>
      <LocalVideo />
      <VideoToggle />
    </div>
  )
}
