import { fastPage, createDirectories, delay } from "scrapper-tools"
import { config } from "./config"
import path from "path"
import { bootServer } from "./server"
import { appendFileSync } from "fs"

export interface IMessageData {
  phone_number: string
  message: string
  date: string
}

export let messageData: Array<IMessageData> = []

async function loginToGmail() {
  let page = await fastPage().newPage()
  await page.goto("https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/")

  await page.waitForSelector('input[type="email"]')
  await page.type('input[type="email"]', config("GMAIL_USERNAME"))
  await page.click("#identifierNext")

  await page.waitForSelector('input[type="password"]', { visible: true })
  await page.type('input[type="password"]', config("GMAIL_PASSWORD"))

  await page.waitForSelector("#passwordNext", { visible: true })
  await page.click("#passwordNext")

  // await page.close()
}

async function work() {
  let page = await fastPage().newPage()
  const client = await page.target().createCDPSession()
  await client.send("Page.enable")
  await client.send("Network.enable")

  console.log("Ordering to listen to websocket")
  client.on("Network.webSocketFrameReceived", ({ response }) => {
    if (response && response.payloadData && response.payloadData.startsWith(`42["mt:new-message"`)) {
      console.log("Webscoket frame received", response)

      try {
        let payload = response.payloadData
        payload = payload.substr(2)
        payload = JSON.parse(payload)
        let body = JSON.parse(payload[1].message.data)

        if (body.new_content && body.new_content.phone_num) {
          let message = body.new_content.body

          if (message && message.length === 1) {
            let phone_no = body.new_content.phone_num
            let date = new Date().toString()
            messageData.push({
              phone_number: phone_no,
              message: message,
              date,
            })

            appendFileSync(
              path.join(__dirname, "/../otp.log"),
              `Phone no ${phone_no}, otp ${message}, date: ${date} \n\r\n\n`,
            )
          }

          console.log("Received Message", body.new_content.phone_num, body)
        }
      } catch (e) {
        console.log("Error on mighty text", e)
      }
    }
  })

  await page.goto("https://mightytext.net/web8/", {
    waitUntil: "networkidle0",
  })
}

async function main() {
  fastPage().setUserDataDir(createDirectories(path.join(__dirname, "/../chrome_cache")))
  fastPage().setHeadless(config("HEADLESS"))

  if (config("LOGIN_TO_GMAIL") === true) {
    await loginToGmail()
  }
  await Promise.all([bootServer(), work()])
}

main()
