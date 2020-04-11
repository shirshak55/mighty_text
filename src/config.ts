import { parseToml, meow } from "scrapper-tools"
import path from "path"

export function config(key?: string) {
  let config = path.join(__dirname, "/../config.toml")

  let parsedObj = parseToml(config)

  if (key) {
    if (key in parsedObj) {
      return parsedObj[key]
    } else {
      console.error(`The key {${key}} is not found in setting`, parsedObj)
      process.exit(0)
    }
  }

  return parsedObj
}

if (require.main === module) {
  console.log(config())
}
