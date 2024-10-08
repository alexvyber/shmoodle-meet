import { cx } from "cvax"
import { Link } from "./link"
import { cn } from "@/lib/utils"

export function Verse({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      data-slot="text"
      className={cn("text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400", className)}
    />
  )
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cx(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white"
      )}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      {...props}
      className={cx(className, "font-medium text-zinc-950 dark:text-white")}
    />
  )
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cx(
        className,
        "rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white"
      )}
    />
  )
}
