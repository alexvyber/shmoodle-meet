"use client"

import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"

const uuid = nanoid()

type MediaState = {
  uuid: string
  joined: boolean
  live: boolean
  device: any

  devices: {
    video: boolean
    audio: boolean
  }

  transports: {
    producer: any
    consumer: any
  }

  audioStream: null | MediaStream
  videoStream: null | MediaStream

  local: {
    screen: null | MediaStream
  }
}

const initialState: MediaState = {
  uuid,
  joined: false,
  live: false,
  device: null,

  transports: {
    producer: null,
    consumer: null,
  },

  devices: {
    video: false,
    audio: false,
  },

  audioStream: null,
  videoStream: null,

  local: {
    screen: null,
  },
}

const mediaSlice = createSlice({
  name: "media",
  initialState,

  reducers: {
    setDeviceReady(state, action: PayloadAction<{ device: any; video: any; audio: any }>) {
      state.device = action.payload.device
      state.devices.video = action.payload.video
      state.devices.audio = action.payload.audio
    },

    setDevices(state, action: PayloadAction<{ video: any; audio: any }>) {
      state.devices.video = action.payload.video
      state.devices.audio = action.payload.audio
    },

    setAudio(state, action: PayloadAction<MediaState["audioStream"]>) {
      state.audioStream = action.payload
    },

    setVideo(state, action: PayloadAction<MediaState["videoStream"]>) {
      state.videoStream = action.payload
    },

    setScreen(state, action: PayloadAction<{ screen: any }>) {
      state.local.screen = action.payload.screen
    },

    setLive(state) {
      state.live = true
    },

    leave(state) {
      state.joined = false
      state.live = false
    },

    setTransports(state, action: PayloadAction<{ producerTransport: any; consumerTransport: any }>) {
      state.transports.producer = action.payload.producerTransport
      state.transports.consumer = action.payload.consumerTransport
    },
  },
})

export const mediaActions = mediaSlice.actions
export default mediaSlice.reducer
