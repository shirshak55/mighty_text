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
const express_1 = __importDefault(require("express"));
const main_1 = require("./main");
function bootServer() {
    return __awaiter(this, void 0, void 0, function* () {
        let app = express_1.default();
        app.get("/sms", (req, res) => {
            return res.json(main_1.messageData);
        });
        app.listen(30017, () => {
            console.log("Server Listening at", "http://localhost:30017");
        });
    });
}
exports.bootServer = bootServer;
//# sourceMappingURL=server.js.map