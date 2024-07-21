import { RtpCodecCapability, WorkerLogLevel } from "mediasoup/node/lib/types.js"
import { logger } from "./logger.js"

await validateEnv()

type Config = {
  version: string
  port: number

  ipAddress: {
    ip: string
  }

  rtcMinPort: number
  rtcMaxPort: number

  mediaCodecs: RtpCodecCapability[]

  mediasoupLogLevel: WorkerLogLevel
}

export const config = {
  version: "0.0.0",
  port: Number.parseInt(process.env.API_PORT || "3000", 10),

  ipAddress: {
    ip: process.env.API_PUBLIC_IP_ADDRESS!,
  },

  rtcMinPort: Number.parseInt(process.env.RTC_MIN_PORT || `${2 ** 13}`, 10),
  rtcMaxPort: Number.parseInt(process.env.RTC_MAX_PORT || `${2 ** 15}`, 10),

  mediaCodecs: [
    { kind: "audio", mimeType: "audio/opus", clockRate: 48000, channels: 2 },
    {
      kind: "video",
      mimeType: "video/VP8",
      clockRate: 90000,
      parameters: { "x-google-start-bitrate": 2 ** 11 },
    },
  ],

  mediasoupLogLevel: "debug",
} satisfies Config

// Stupidly simple env validation doesn't require to install library
async function validateEnv() {
  try {
    required("API_PORT")
    integer("API_PORT")
    required("API_PUBLIC_IP_ADDRESS")
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
    // @ts-expect-error we are using coercion to catch things that `parseInt` will fix for us
    isNaN(process.env?.[name]) ||
    isNaN(parseInt(process.env?.[name]))
  ) {
    throw new Error(`${name} env variable must be of type integer`)
  }
}
