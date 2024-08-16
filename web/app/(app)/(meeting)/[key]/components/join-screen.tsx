import { AudioVizualizer } from "@/components/common/audio-vizualizer"
import { Heading } from "lucide-react"
import { AudioToggle } from "../../components/aduio-toggle"
import { NameDisplay } from "../../components/name-display"
import { VideoToggle } from "../../components/video-toggle"
import { VideoPreview } from "./video-preview"
import { Button } from "@/components/ui/button"

export function JoinScreen() {
  return (
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
  )
}
