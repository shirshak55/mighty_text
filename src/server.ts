import express from "express"
import { messageData } from "./main"

export async function bootServer() {
  let app = express()

  app.get("/sms", (req, res) => {
    return res.json(messageData)
  })

  app.listen(30017, () => {
    console.log("Server Listening at", "http://localhost:30017")
  })
}
