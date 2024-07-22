import type { PayloadAction } from "@reduxjs/toolkit"
import { generateRandomWords } from "../random-words"

type MeetingState = {
  key: string | null
  errors: { key: string | null }
  room: string | null
  ended: boolean
}

type MeetingAction =
  | PayloadAction<string, "meeting-key">
  | PayloadAction<string, "meeting-key-random">
  | PayloadAction<string, "meeting-errors-clear">
  | PayloadAction<string, "meeting-errors-key">
  | PayloadAction<string, "meeting-room">
  | PayloadAction<string, "leave">

const initialState: MeetingState = {
  key: null,
  errors: { key: null },
  room: null,
  ended: false,
}

export const meetingReducer = (state: MeetingState, action: MeetingAction) => {
  switch (action.type) {
    case "meeting-key":
      return { ...state, key: action.payload, ended: false }

    case "meeting-key-random":
      return { ...state, key: generateRandomWords({ exactly: 5 }).join("-"), ended: false }

    case "meeting-errors-clear":
      return { ...state, errors: { ...initialState.errors } }

    case "meeting-errors-key":
      return { ...state, errors: { ...state.errors, key: action.payload } }

    case "meeting-room":
      return { ...state, room: action.payload, ended: false }

    case "leave":
      return { ...state, ended: true }

    default:
      return state
  }
}
