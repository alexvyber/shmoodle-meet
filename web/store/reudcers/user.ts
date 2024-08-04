"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export const initialState = {
  username: "",
  email: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUsername(state, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username
    },

    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
  },
})

export const userActions = userSlice.actions
export default userSlice.reducer
