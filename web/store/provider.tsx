"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { type AppStore, getStore } from "."

export function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = getStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
