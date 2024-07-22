"use client"

import { Text } from "@/components/ui/text"
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
import { DateTime } from "luxon"
import type React from "react"
import { useState } from "react"

export default function MeetingPage() {
  return (
    <div className="flex flex-col justify-center w-full  h-full ">
      <div className="pt-4  max-w-[80vw] mx-auto w-full h-full">
        <div className="bg-zinc-500 max-w-[90vw] mx-auto w-full h-full" />
      </div>

      <div className="flex justify-between gap-2 items-center  px-4 py-2">
        <div className="flex gap-3 items-center font-medium w-full">
          <div>{DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)}</div>
          <Text>|</Text>
          <div>{"qvz-uqsz-euc"}</div>
        </div>

        <div className=" p-2 rounded-md flex justify-center gap-2.5 w-full">
          <Settings>
            <MicroButton />
          </Settings>
          <Settings>
            <VideoButton />
          </Settings>

          <EmojiButton />
          <PointerButton />
          <PresentButton />
          <EndCallButton />
        </div>

        <div className="w-full flex items-center justify-end gap-2.5">
          <ChatButton />
          <UsersButton />
          <InfoButton />
        </div>
      </div>
    </div>
  )
}

const iconSizing = "w-[22px] h-[22px]"
const buttonSizing = "w-10 h-10"

function EndCallButton() {
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

function Settings({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-zinc-600  cursor-pointer  rounded-full w-[70px] flex justify-end items-center">
      <div className="w-6 h-6 flex justify-center items-center">
        <ChevronUpIcon className="w-5 h-5" />
      </div>
      {children}
    </div>
  )
}

function MicroButton() {
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

function VideoButton() {
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

function PresentButton() {
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

function EmojiButton() {
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

function PointerButton() {
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

function ChatButton() {
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
      {active ? <MessageSquareTextIcon className={cx(iconSizing)} /> : <MessageSquareIcon className={cx(iconSizing)} />}
    </button>
  )
}

function UsersButton() {
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

function InfoButton() {
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
