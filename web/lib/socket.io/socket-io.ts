"use client"

import { io } from "socket.io-client"

const url = "http://localhost:7070"

export const socket = io(url)

export function socketRequest(type: string, data = {}) {
  return new Promise((resolve) => {
    socket.emit(type, data, resolve)
  })
}
