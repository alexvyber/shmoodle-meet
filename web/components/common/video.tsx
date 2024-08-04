"use client"

import { useAppSelector } from "@/hooks/use-store"
import { useEffect, useRef } from "react"

export function LocalVideo() {
  const videoRef = useRef<React.ElementRef<"video"> | null>(null)
  const video = useAppSelector((state) => state.media.local.video)

  useEffect(() => {
    if (!videoRef?.current) {
      return
    }

    if (!video) {
      videoRef.current.srcObject = null
    }

    if (video) {
      videoRef.current.srcObject = video
      videoRef.current.play()
    }
  }, [video])

  if (!video) {
    return null
  }

  return (
    <div className="pt-3 h-96 w-full">
      <video
        ref={videoRef}
        playsInline={true}
        muted={true}
        style={{
          width: 320,
          height: 192,
          objectFit: "cover",
          background: "black",
          transform: "rotateY(180deg)",
        }}
      />
    </div>
  )
}
