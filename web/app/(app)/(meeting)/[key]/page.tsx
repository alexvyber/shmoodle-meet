"use client"
import { useBoolean } from "@/hooks/use-boolean"
import { VideoToggle } from "../components/video-toggle"
import { Button } from "@/components/ui/button"
import { VideoPreview } from "./components/video-preview"
import { Heading } from "@/components/ui/heading"
import { AudioVizualizer } from "@/components/common/audio-vizualizer"
import { AudioToggle } from "../components/aduio-toggle"
import { NameDisplay } from "../components/name-display"

export default function MeetingPage() {
  const chat = useBoolean()

  return (
    <>
      {/* Joining screen */}

      {/* Meeting screen */}
      {/* <div className="flex flex-col justify-center w-full  h-full ">
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

      <Chat boolean={chat} /> */}

      <div className="flex justify-center items-center w-full h-full gap-12">
        <div className="relative  w-[720px] h-[420px] rounded-[32px] bg-red-500 overflow-hidden">
          <div className="absolute top-0 left-0">
            <VideoPreview />
          </div>
          <div className="absolute bottom-0 left-0 w-full px-3 py-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent  overflow-hidden">
            <div className="flex justify-between w-full items-center">
              <div className="w-full">
                <NameDisplay name="Alex Vyber" />
              </div>

              <div className=" flex gap-2  w-full justify-center">
                <AudioToggle />
                <VideoToggle />
              </div>

              <div className="w-full flex justify-end">
                <AudioVizualizer />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center px-20">
          <Heading>Ready to join?</Heading>
          <div className="flex gap-2">
            <Button
              size="lg"
              variant="solid"
            >
              Join
            </Button>
            <Button size="lg">Present</Button>
          </div>
        </div>
      </div>
    </>
  )
}
