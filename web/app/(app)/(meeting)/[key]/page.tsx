"use client"

import { LocalVideo } from "@/components/common/video"
import { Text } from "@/components/ui/text"
import { useBoolean } from "@/hooks/use-boolean"
import { genRoomKey } from "@/lib/utils"
import { DateTime } from "luxon"
import { VideoToggle } from "../components/video-toggle"
import { sendMessage } from "@/lib/socket.io"
import {
  Chat,
  ChatButton,
  EmojiButton,
  EndCallButton,
  InfoButton,
  MicroButton,
  PointerButton,
  PresentButton,
  Settings,
  UsersButton,
} from "../components/meeting-ui"

export default function MeetingPage() {
  const chat = useBoolean()

  return (
    <>
      <div className="flex flex-col justify-center w-full  h-full ">
        <div className=" h-full flex gap-4 pt-4 ">
          <LocalVideo />
          <div className="bg-zinc-500  mx-auto w-full h-full max-w-[80vw] rounded" />
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
              <VideoToggle />
            </Settings>

            <EmojiButton />
            <PointerButton />
            <PresentButton />
            <EndCallButton />
          </div>

          <button onClick={async () => sendMessage(genRoomKey())}>message</button>

          <div className="w-full flex items-center justify-end gap-2.5">
            <ChatButton boolean={chat} />
            <UsersButton />
            <InfoButton />
          </div>
        </div>
      </div>

      <Chat boolean={chat} />
    </>
  )
}
