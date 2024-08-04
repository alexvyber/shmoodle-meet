"use client"
import { cx } from "cvax"
import { useCallback, useEffect, useState } from "react"

const buttonSizing = "w-10 h-10"

export function AudioVizualizer() {
  const [context] = useState(() => new AudioContext())
  const [analyser, setAnalyser] = useState<AnalyserNode>()
  //   const audioStream = useAppSelector((state) => state.media.audioStream)!
  const [audioStream, setaudioStream] = useState<MediaStream>()

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()

  useEffect(() => {
    async function some() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      console.log("🚀 ~ some ~ devices:", devices)

      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log("🚀 ~ some ~ audioStream:", audioStream)
      setaudioStream(audioStream)
    }

    some()
  }, [])

  useEffect(() => {
    if (!audioStream) return

    const recorder = new MediaRecorder(audioStream)
    recorder.start()
    setMediaRecorder(recorder)

    return () => recorder.stop()
  }, [audioStream])

  useEffect(() => {
    if (!mediaRecorder?.stream) return

    console.log("🚀 ~ useEffect ~ mediaRecorder?.stream:", mediaRecorder?.stream)

    const analyserNode = context.createAnalyser()
    setAnalyser(analyserNode)

    analyserNode.fftSize = 2048
    // analyserNode.minDecibels = -31
    // analyserNode.maxDecibels = -100
    analyserNode.smoothingTimeConstant = 0.4
    const source = context.createMediaStreamSource(mediaRecorder.stream)
    source.connect(analyserNode)

    return () => source.disconnect()
  }, [mediaRecorder?.stream])

  const report = useCallback(() => {
    if (!(analyser && mediaRecorder)) return

    const data = new Uint8Array(analyser?.frequencyBinCount)
    const myDataArray = new Float32Array(analyser.frequencyBinCount)

    switch (mediaRecorder.state) {
      case "recording": {
        analyser.getByteFrequencyData(data)
        // console.log("🚀 ~ report ~ data:", data)
        console.log(data.filter((i) => i > 0).length)
        requestAnimationFrame(report)
        break
      }

      case "paused":
        //   processFrequencyData(data)
        break

      case "inactive":
        context.state !== "closed" && context.close()
    }
  }, [mediaRecorder, analyser, context.state])

  useEffect(() => {
    if (analyser && mediaRecorder?.state === "recording") {
      report()
    }
  }, [analyser, mediaRecorder?.state])

  return <div className={cx("bg-blue-500 rounded-full", buttonSizing)} />
}
