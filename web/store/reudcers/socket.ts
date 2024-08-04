"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: { id: string | null } = {
  id: null,
}

const socketSlice = createSlice({
  name: "socket",
  initialState,

  reducers: {
    openSocket(state, action: PayloadAction<{ id: string }>) {
      state.id = action.payload.id
    },
  },
})

export const socketActions = socketSlice.actions
export default socketSlice.reducer
