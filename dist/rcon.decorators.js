"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRcon = void 0;
const common_1 = require("@nestjs/common");
const rcon_utils_1 = require("./rcon.utils");
const InjectRcon = (connection) => {
    return (0, common_1.Inject)((0, rcon_utils_1.getRconConnectionToken)(connection));
};
exports.InjectRcon = InjectRcon;
