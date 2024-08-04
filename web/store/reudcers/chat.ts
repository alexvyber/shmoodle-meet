"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ChatState = {
  messages: string[]
}

export const initialState: ChatState = {
  messages: [],
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newMessage(state, action: PayloadAction<{ message: string }>) {
      state.messages.push(action.payload.message)
    },

    leave(state) {
      state = initialState
    },
  },
})

export const chatActions = chatSlice.actions
export default chatSlice.reducer
