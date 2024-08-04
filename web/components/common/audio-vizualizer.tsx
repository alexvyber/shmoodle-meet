"use client"

import { useAppSelector } from "@/hooks/use-store"
import { cx } from "cvax"
import React, { createRef, useEffect, useRef } from "react"

const buttonSizing = "w-10 h-10"

export function AudioVizualizer() {
  const audioStream = useAppSelector((state) => state.media.audioStream)
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([createRef(), createRef(), createRef()])

  useEffect(() => {
    if (!(audioStream instanceof MediaStream)) return

    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const microphone = audioContext.createMediaStreamSource(audioStream)
    microphone.connect(analyser)

    const bFrequencyData = new Uint8Array(analyser.frequencyBinCount)

    function draw() {
      setTimeout(() => requestAnimationFrame(draw), 50)

      analyser.getByteFrequencyData(bFrequencyData)

      // naive way to get audio level
      const level = bFrequencyData.reduce((acc, cur) => acc + cur, 0) / bFrequencyData.length

      refs.current.map((ref, i) => ref.current?.style.setProperty("height", `${calculateHeight(i, level)}px`))
    }

    draw()

    return () => {
      audioContext.close()
      analyser.disconnect()
      microphone.disconnect()
    }
  }, [audioStream])

  return (
    <div className={cx("bg-blue-500 rounded-full py-2 px-2.5 flex items-center justify-between", buttonSizing)}>
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          ref={refs.current[i]}
          className="bg-white w-1 min-h-2 rounded "
        />
      ))}
    </div>
  )
}

function calculateHeight(index: number, level: number) {
  return (
    // Minimal value: either calculated or max for given bar
    Math.min(
      (level / 100) * (index === 1 ? 2 : 1) * 24, // if central bar than bar is 2 times higher
      index % 2 === 0 ? 18 : 24 // if bar on the side, bar's max lower than center's
    )
  )
}
