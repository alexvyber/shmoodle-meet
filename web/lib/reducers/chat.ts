import type { PayloadAction } from "@reduxjs/toolkit"
import { assertNever } from "../assert-never"

type ChatState = {
  messages: string[]
}

type ChatAction = PayloadAction<string, "message"> | PayloadAction<void, "leave">

const initialState: ChatState = {
  messages: [],
}

export function chatReducer(state: ChatState, action: ChatAction) {
  switch (action.type) {
    case "message":
      return { messages: [...state.messages, action.payload] }

    case "leave":
      return initialState

    default:
      assertNever(action)
  }
}
