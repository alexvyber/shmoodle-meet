"use client"

import { useAppSelector } from "@/hooks/use-store"
import { useEffect, useRef } from "react"

export function VideoPreview() {
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

  return (
    <video
      ref={videoRef}
      playsInline={true}
      muted={true}
      className="rounded-xl"
      style={{
        width: 720,
        height: 420,
        objectFit: "cover",
        background: "black",
        transform: "rotateY(180deg)",
      }}
    />
  )
}
