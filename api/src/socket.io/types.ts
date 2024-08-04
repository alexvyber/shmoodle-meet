import type { Namespace, Socket } from "socket.io"
import type { Mediasoup } from "../mediasoup/index.js"

// types for the namespace named "/my-namespace"
interface NamespaceSpecificClientToServerEvents {
  uuid: (arg: string) => void
  join: (data: any, cb: (args: any) => any) => void
  message: (data: any, cb: (args: any) => any) => void
  "join-room": (data: any, cb: (...args: any[]) => void) => void
  "close-rroducer": (data: any, cb: (...args: any[]) => void) => void
  "get-router-rtp-capabilities": (data: any, cb: (...args: any[]) => void) => void
  "create-producer-transport": (data: any, cb: (...args: any[]) => void) => void
  "create-consumer-transport": (data: any, cb: (...args: any[]) => void) => void
  "connect-producer-pransport": (data: any, cb: (...args: any[]) => void) => void
  "connect-consumer-transport": (data: any, cb: (...args: any[]) => void) => void
  produce: (data: any, cb: (...args: any[]) => void) => void
  consume: (data: any, cb: (...args: any[]) => void) => void
  resume: (data: any, cb: (...args: any[]) => void) => void
  leave: (data: any, cb: (...args: any[]) => void) => void
}

interface NamespaceSpecificServerToClientEvents {
  welcome: (arg: string) => void
  message: (params: { uuid: string; content: string; username: string; email: string }) => void
  peers: (arg: (typeof Mediasoup)["peers"]) => void
  "producer-close": (...args: any[]) => any
  producer: (...args: any[]) => any
}

interface NamespaceSpecificInterServerEvents {
  foo: (arg: string) => void
}

type NamespaceSpecificSocketData = {}

export type CustomIO = Namespace<
  NamespaceSpecificClientToServerEvents,
  NamespaceSpecificServerToClientEvents,
  NamespaceSpecificInterServerEvents,
  NamespaceSpecificSocketData
>
export type CustomSocket = Socket<
  NamespaceSpecificClientToServerEvents,
  NamespaceSpecificServerToClientEvents,
  NamespaceSpecificInterServerEvents,
  NamespaceSpecificSocketData
>

export type OnCallback<T = any> = ({
  socket,
  data,
  callback,
}: { socket: CustomSocket; data: T; callback: (arg?: any) => void }) => void | Promise<void>
