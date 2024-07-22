"use client"

import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { Heading, Subheading } from "@/components/ui/heading"
import { Input, InputGroup } from "@/components/ui/input"
import { isNotNull } from "@/lib/utils"
import { LinkIcon } from "@heroicons/react/20/solid"
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
    <div className="flex h-full items-center justify-center flex-col gap-8">
      <section className="flex h-full items-center justify-center flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <Heading>Video calls and meetings for couple of people</Heading>
          <Subheading>Sometimes it works... Most of the times...</Subheading>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <InputGroup className="!w-96">
              <LinkIcon />
              <Input
                name="search"
                placeholder="Enter code or link"
                aria-label="Search"
                className=" lg:w-96 "
              />
            </InputGroup>
            <Button
              variant="solid"
              disabled
            >
              Join
            </Button>
          </div>

          <Divider />
          <div className="flex flex-col gap-3">
            <Button>Start instant meeting</Button>
            <Button>Create meeting for later</Button>
          </div>
        </div>
      </section>
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
    </div>
  )
}
