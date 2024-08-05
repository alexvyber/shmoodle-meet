"use client"

import { useAppSelector } from "@/hooks/use-store"
import { cx } from "cvax"
import React, { createRef, useEffect, useRef } from "react"

const buttonSizing = "w-10 h-10"

export function AudioVizualizer() {
  const audioStream = useAppSelector((state) => state.media.audioStream)
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([createRef(), createRef(), createRef()])

  useEffect(() => {
    // if no audioStream set default height for bars
    if (!(audioStream instanceof MediaStream)) {
      refs.current.map((ref) => ref.current?.style.setProperty("height", "6px"))
      return
    }

    const audioContext = new AudioContext()

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 2 ** 9

    const microphone = audioContext.createMediaStreamSource(audioStream)
    microphone.connect(analyser)

    const byteFrequencyData = new Uint8Array(analyser.frequencyBinCount)

    const setAudioLevels = () => {
      analyser.getByteFrequencyData(byteFrequencyData)

      refs.current.map((ref, i) =>
        ref.current?.style.setProperty("height", `${calculateBarHeight(i, byteFrequencyData)}px`)
      )
    }

    const intervalId = setInterval(() => setAudioLevels(), 20)

    return () => {
      clearInterval(intervalId)
      audioContext.close()
      analyser.disconnect()
      microphone.disconnect()
    }
  }, [audioStream])

  return (
    <div
      className={cx(
        "bg-blue-500 rounded-full py-2  flex items-center justify-center transition duration-75 gap-1",
        buttonSizing,
        "relative"
      )}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          ref={refs.current[i]}
          className="bg-white w-1.5 min-h-[6px] rounded "
        />
      ))}
    </div>
  )
}

// TODO: remove - tmp
// const logLevel = getLogLevel()

function calculateBarHeight(index: number, byteFrequencyData: Uint8Array): number {
  // naive way to get audio level
  const level = byteFrequencyData.reduce((acc, cur) => acc + cur, 0) / byteFrequencyData.length

  // TODO: remove - tmp
  // logLevel(level)

  // the bigger the sensetivity, the bigger noise we need to get 100% bar height
  const sensetivity = 0.15

  return (
    // Minimal value: either calculated or max for given bar
    Math.min(
      level *
        sensetivity *
        // if central bar than bar is 2 times higher
        (index === 1 ? 2 : 1) *
        24,
      // if bar on the side, bar's max lower than center's
      index % 2 === 0 ? 18 : 28
    )
  )
}

// tmp helper
function getLogLevel() {
  let max = 0
  return function logLevel(level: number) {
    level > max && (max = level)

    console.log({ level, max })
  }
}
