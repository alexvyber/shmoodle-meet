import type { types } from "mediasoup"
import { config } from "../config.js"

export const createWebRtcTransport = async ({ router }: { router: types.Router }) => {
  const transport = await router.createWebRtcTransport({
    listenIps: [config.ipAddress],
    enableUdp: true,
    enableTcp: true,
    preferUdp: false,
    initialAvailableOutgoingBitrate: 2 ** 20,
  })

  await transport.setMaxIncomingBitrate(2 ** 21)

  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  }
}
