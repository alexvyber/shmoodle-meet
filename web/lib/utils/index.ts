import { ClassValue, cx } from "cvax"
import pino from "pino"
import { twMerge } from "tailwind-merge"

export function isNotNull<T>(some: T): some is NonNullable<T> {
  if (!some && typeof some === "object") return false
  return true
}

export const logger = pino({ level: "error" })

export function cn(...classes: ClassValue[]) {
  return twMerge(cx(...classes))
}
