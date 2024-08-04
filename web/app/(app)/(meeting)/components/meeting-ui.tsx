"use client"

import { Drawer } from "@/components/ui/drawer"
import { type UseBoolean } from "@/hooks/use-boolean"
import { useAppSelector } from "@/hooks/use-store"
import { cx } from "cvax"
import {
  ChevronUpIcon,
  InfoIcon,
  MessageSquareIcon,
  MessageSquareTextIcon,
  MicIcon,
  MicOffIcon,
  MonitorUpIcon,
  MousePointer2Icon,
  MousePointerClickIcon,
  PhoneOffIcon,
  SmileIcon,
  SmilePlusIcon,
  UsersRoundIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react"
import type React from "react"
import { useState } from "react"

const iconSizing = "w-[22px] h-[22px]"
const buttonSizing = "w-10 h-10"

export function EndCallButton() {
  return (
    <button
      className={
        "h-10 w-16 bg-red-500 hover:bg-red-600 transition duration-200 rounded-full flex justify-center items-center"
      }
    >
      <PhoneOffIcon className={iconSizing} />
    </button>
  )
}

export function Settings({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-zinc-600  cursor-pointer  rounded-full w-[70px] flex justify-end items-center">
      <div className="w-6 h-6 flex justify-center items-center">
        <ChevronUpIcon className="w-5 h-5" />
      </div>
      {children}
    </div>
  )
}

export function MicroButton() {
  const [active, setActive] = useState(true)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-500  hover:bg-red-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {active ? <MicIcon className={iconSizing} /> : <MicOffIcon className={iconSizing} />}
    </button>
  )
}

export function VideoButton() {
  const [active, setActive] = useState(true)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-500  hover:bg-red-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {active ? <VideoIcon className={iconSizing} /> : <VideoOffIcon className={iconSizing} />}
    </button>
  )
}

export function PresentButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      <MonitorUpIcon className={cx(iconSizing)} />
    </button>
  )
}

export function EmojiButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {active ? <SmileIcon className={cx(iconSizing)} /> : <SmilePlusIcon className={cx(iconSizing)} />}
    </button>
  )
}

export function PointerButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {active ? <MousePointerClickIcon className={cx(iconSizing)} /> : <MousePointer2Icon className={cx(iconSizing)} />}
    </button>
  )
}

export function ChatButton({ boolean }: { boolean: UseBoolean }) {
  return (
    <button
      onClick={boolean.toggle}
      className={cx(
        buttonSizing,
        boolean.state ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      {boolean.state ? (
        <MessageSquareTextIcon className={cx(iconSizing)} />
      ) : (
        <MessageSquareIcon className={cx(iconSizing)} />
      )}
    </button>
  )
}

export function UsersButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      <UsersRoundIcon className={cx(iconSizing)} />
    </button>
  )
}

export function InfoButton() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive((p) => !p)}
      className={cx(
        buttonSizing,
        active ? "bg-blue-500  hover:bg-blue-600" : "bg-zinc-700 hover:bg-zinc-600",
        " transition duration-200 rounded-full flex justify-center items-center"
      )}
    >
      <InfoIcon className={cx(iconSizing)} />
    </button>
  )
}

export function Chat({ boolean }: { boolean: UseBoolean }) {
  const messages = useAppSelector((s) => s.chat.messages)

  return (
    <Drawer
      open={boolean.state}
      setOpen={boolean.setState}
      side="right"
    >
      <div className="flex flex-col gap-1 text-sm w-full h-full">
        {messages.map((message) => (
          <div className="text-black">{message}</div>
        ))}
      </div>
    </Drawer>
  )
}
