import { WebSocketServer } from "ws"

// const server = createServer()

const wss = new WebSocketServer({
  port: 7070,
  // server
})

wss.on("connection", function connection(ws) {
  ws.on("error", console.error)

  ws.on("message", function message(data) {
    console.info(data.toString())

    ws.send(`from server ${Math.random()}`)
  })

  ws.send("something")
})

// server.on("request", (_req, res) => {
//   res.end(JSON.stringify({ status: "ok" }))
// })
// server.listen(4000)
