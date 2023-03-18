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
exports.createRconConnection = exports.getRconConnectionToken = exports.getRconOptionsToken = void 0;
const rcon_client_1 = require("rcon-client");
const rcon_constants_1 = require("./rcon.constants");
function getRconOptionsToken(connection) {
    return `${connection || rcon_constants_1.RCON_MODULE_CONNECTION}_${rcon_constants_1.RCON_MODULE_OPTIONS_TOKEN}`;
}
exports.getRconOptionsToken = getRconOptionsToken;
function getRconConnectionToken(connection) {
    return `${connection || rcon_constants_1.RCON_MODULE_CONNECTION}_${rcon_constants_1.RCON_MODULE_CONNECTION_TOKEN}`;
}
exports.getRconConnectionToken = getRconConnectionToken;
function createRconConnection(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config } = options;
        try {
            return yield rcon_client_1.Rcon.connect(config);
        }
        catch (error) {
            console.error(error);
            setTimeout(() => {
                createRconConnection(options);
            }, 5000);
        }
    });
}
exports.createRconConnection = createRconConnection;
