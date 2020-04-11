"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_tools_1 = require("scrapper-tools");
const path_1 = __importDefault(require("path"));
function config(key) {
    let config = path_1.default.join(__dirname, "/../config.toml");
    let parsedObj = scrapper_tools_1.parseToml(config);
    if (key) {
        if (key in parsedObj) {
            return parsedObj[key];
        }
        else {
            console.error(`The key {${key}} is not found in setting`, parsedObj);
            process.exit(0);
        }
    }
    return parsedObj;
}
exports.config = config;
if (require.main === module) {
    console.log(config());
}
//# sourceMappingURL=config.js.map