"use client"

import { useAppSelector } from "@/hooks/use-store"
import { useEffect, useRef } from "react"

export function LocalVideo() {
  const videoRef = useRef<React.ElementRef<"video"> | null>(null)
  const videoStream = useAppSelector((state) => state.media.videoStream)

  useEffect(() => {
    if (!videoRef?.current) {
      return
    }

    if (!videoStream) {
      videoRef.current.srcObject = null
    }

    if (videoStream) {
      videoRef.current.srcObject = videoStream
      videoRef.current.play()
    }
  }, [videoStream])

  if (!videoStream) {
    return null
  }

  return (
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
  )
}
