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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@cardano-ogmios/client");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = yield (0, client_1.createInteractionContext)(err => console.error(err), () => console.log("Connection closed."), { connection: { host: process.env.CARDANO_NODE_HOST, port: parseInt(process.env.OGMIOS_PORT) } });
        const client = yield (0, client_1.createStateQueryClient)(context);
        const result = yield client.blockHeight();
        console.log(`result: ${result}`);
        yield client.shutdown(); // Close the connection when done.
    });
}
run().then(() => console.log("done")).catch(err => console.error(err));
