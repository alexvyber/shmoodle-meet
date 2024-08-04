import type { RtpCodecCapability, WorkerLogLevel } from "mediasoup/node/lib/types.js"
import { logger } from "./logger.js"

await validateEnv()

type Config = {
  version: string
  port: number

  ipAddress: { ip: string }

  rtcMinPort: number
  rtcMaxPort: number

  mediaCodecs: RtpCodecCapability[]

  mediasoupLogLevel: WorkerLogLevel
}

export const config = {
  version: "0.0.0",
  port: Number.parseInt(process.env.API_PORT || "3000", 10),

  ipAddress: { ip: process.env.API_PUBLIC_IP_ADDRESS! },

  rtcMinPort: Number.parseInt(process.env.API_RTC_MIN_PORT || `${2 ** 13}`, 10),
  rtcMaxPort: Number.parseInt(process.env.API_RTC_MAX_PORT || `${2 ** 15}`, 10),

  mediaCodecs: [
    { kind: "audio", mimeType: "audio/opus", clockRate: 48000, channels: 2 },
    {
      kind: "video",
      mimeType: "video/VP8",
      clockRate: 90000,
      parameters: { "x-google-start-bitrate": 2 ** 11 },
    },
  ],

  mediasoupLogLevel: process.env.API_MEDIASOUP_LOG_LEVEL as WorkerLogLevel,
} satisfies Config

// REFACTOR: custom validation doesn't look simple enough to keep this shit...
// so, may just use valibot?
async function validateEnv() {
  try {
    required("API_PORT")
    integer("API_PORT")
    required("API_PUBLIC_IP_ADDRESS")
    ENUM("API_MEDIASOUP_LOG_LEVEL", ["debug", "error", "none", "warn"])
  } catch (error) {
    logger.error(error)

    process.exit(0)
  }
}

function required(name: string) {
  if (!(name in process.env)) throw new Error(`${name} env variable is required`)
}

function integer(name: string) {
  required(name)

  if (
    typeof process.env?.[name] !== "string" ||
    Number.isNaN(process.env?.[name]) ||
    Number.isNaN(Number.parseInt(process.env?.[name]))
  ) {
    throw new Error(`${name} env variable must be of type integer`)
  }
}

function ENUM(name: string, entries: string[]) {
  required(name)

  if (!entries.includes(process.env?.[name]!)) {
    throw new Error(`${name} env variable must be one of ${entries.map((w) => `'${w}'`).join(", ")}`)
  }
}
