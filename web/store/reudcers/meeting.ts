"use client"

import { genRoomKey } from "@/lib/utils/gen-room-key"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type MeetingState = {
  key: string | null
  errors: { key: string | null }
  room: string | null
  ended: boolean
}

const initialState: MeetingState = {
  key: null,
  errors: { key: null },
  room: null,
  ended: false,
}

const meetingSlice = createSlice({
  name: "meeting",
  initialState,

  reducers: {
    setKey(state, action: PayloadAction<{ key: string }>) {
      state.key = action.payload.key
    },

    setRandomKey(state) {
      state.key = genRoomKey()
      state.ended = false
    },

    clearErrors(state) {
      state.errors = initialState.errors
    },

    setKeyErrors(state, action: PayloadAction<{ error: string }>) {
      state.errors.key = action.payload.error
    },

    setRoom(state, action: PayloadAction<{ room: string }>) {
      state.room = action.payload.room
      state.ended = false
    },

    leave(state) {
      state.ended = true
    },
  },
})

export const meetingActions = meetingSlice.actions
export default meetingSlice.reducer
