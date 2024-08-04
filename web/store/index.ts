"use store"

import { configureStore } from "@reduxjs/toolkit"
import media from "./reudcers/media"
import meeting from "./reudcers/meeting"
import user from "./reudcers/user"
import socket from "./reudcers/socket"
import chat from "./reudcers/chat"

export function makeStore() {
  return configureStore({
    reducer: {
      chat,
      media,
      meeting,
      user,
      socket,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["media/setVideo", "media/setTransports"],
          // // Ignore these field paths in all actions
          ignoredActionPaths: ["payload.device"],
          // // Ignore these paths in the state
          ignoredPaths: ["media.device", "media.transports.producer", "media.transports.consumer", "media.local.video"],
        },
      }),
  })
}

let store: AppStore | null = null

export function getStore(): AppStore {
  if (!store) store = makeStore()

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
