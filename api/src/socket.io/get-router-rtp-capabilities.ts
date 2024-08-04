import { Mediasoup } from "../mediasoup/index.js"
import type { OnCallback } from "./types.js"

export const getRouterRtpCapabilities: OnCallback = ({ callback }) => callback(Mediasoup.getRouter().rtpCapabilities)
