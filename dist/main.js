"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_tools_1 = require("scrapper-tools");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const server_1 = require("./server");
const fs_1 = require("fs");
exports.messageData = [];
function loginToGmail() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = yield scrapper_tools_1.fastPage().newPage();
        yield page.goto("https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/");
        yield page.waitForSelector('input[type="email"]');
        yield page.type('input[type="email"]', config_1.config("GMAIL_USERNAME"));
        yield page.click("#identifierNext");
        yield page.waitForSelector('input[type="password"]', { visible: true });
        yield page.type('input[type="password"]', config_1.config("GMAIL_PASSWORD"));
        yield page.waitForSelector("#passwordNext", { visible: true });
        yield page.click("#passwordNext");
    });
}
function work() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = yield scrapper_tools_1.fastPage().newPage();
        const client = yield page.target().createCDPSession();
        yield client.send("Page.enable");
        yield client.send("Network.enable");
        console.log("Ordering to listen to websocket");
        client.on("Network.webSocketFrameReceived", ({ response }) => {
            if (response && response.payloadData && response.payloadData.startsWith(`42["mt:new-message"`)) {
                console.log("Webscoket frame received", response);
                try {
                    let payload = response.payloadData;
                    payload = payload.substr(2);
                    payload = JSON.parse(payload);
                    let body = JSON.parse(payload[1].message.data);
                    if (body.new_content && body.new_content.phone_num) {
                        let message = body.new_content.body;
                        if (message && message.length === 1) {
                            let phone_no = body.new_content.phone_num;
                            let date = new Date().toString();
                            exports.messageData.push({
                                phone_number: phone_no,
                                message: message,
                                date,
                            });
                            fs_1.appendFileSync(path_1.default.join(__dirname, "/../otp.log"), `Phone no ${phone_no}, otp ${message}, date: ${date} \n\r\n\n`);
                        }
                        console.log("Received Message", body.new_content.phone_num, body);
                    }
                }
                catch (e) {
                    console.log("Error on mighty text", e);
                }
            }
        });
        yield page.goto("https://mightytext.net/web8/", {
            waitUntil: "networkidle0",
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        scrapper_tools_1.fastPage().setUserDataDir(scrapper_tools_1.createDirectories(path_1.default.join(__dirname, "/../chrome_cache")));
        scrapper_tools_1.fastPage().setHeadless(config_1.config("HEADLESS"));
        if (config_1.config("LOGIN_TO_GMAIL") === true) {
            yield loginToGmail();
        }
        yield Promise.all([server_1.bootServer(), work()]);
    });
}
main();
//# sourceMappingURL=main.js.map