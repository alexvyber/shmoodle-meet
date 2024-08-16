import { Verse } from "@/components/ui/text"

export function NameDisplay({ name }: { name: string }) {
  return (
    <div className="bg-white p-2 px-4 rounded-3xl w-fit">
      <Verse className="text-black font-medium ">{name}</Verse>
    </div>
  )
}
