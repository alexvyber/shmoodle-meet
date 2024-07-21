"use client"

import { isNotNull } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [count, setCount] = useState(0)
  const socketRef = useRef<null | WebSocket>(null)

  useEffect(() => {
    if (!socketRef.current) {
      const socket = new WebSocket("ws://localhost:7070")

      socket.onopen = (e) => {
        socket.send("Hello Server!")
      }

      socket.addEventListener("message", (event) => {
        console.info(event.data)
      })

      socketRef.current = socket
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          setCount((prev) => prev + 1)

          if (isNotNull(socketRef.current)) {
            socketRef.current.send(`asdas  ${count}`)
          }
        }}
      >
        click {count}
      </button>
    </main>
  )
}
