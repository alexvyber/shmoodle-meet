import { logger } from "./logger.js"

await validateEnv()

export const config = {
  version: "0.0.0",
  port: Number.parseInt(process.env.PORT || "3000", 10),
}

// Stupidly simple env validation doesn't require to install library
async function validateEnv() {
  try {
    required("PORT")
    integer("PORT")
    required("PUBLIC_IP_ADDRESS")
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
