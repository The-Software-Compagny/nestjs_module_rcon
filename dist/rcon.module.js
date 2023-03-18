"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RconModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RconModule = void 0;
const common_1 = require("@nestjs/common");
const rcon_core_module_1 = require("./rcon.core-module");
let RconModule = RconModule_1 = class RconModule {
    static forRoot(options, connection) {
        return {
            module: RconModule_1,
            imports: [rcon_core_module_1.RconCoreModule.forRoot(options, connection)],
            exports: [rcon_core_module_1.RconCoreModule],
        };
    }
    static forRootAsync(options, connection) {
        return {
            module: RconModule_1,
            imports: [rcon_core_module_1.RconCoreModule.forRootAsync(options, connection)],
            exports: [rcon_core_module_1.RconCoreModule],
        };
    }
};
RconModule = RconModule_1 = __decorate([
    (0, common_1.Module)({})
], RconModule);
exports.RconModule = RconModule;
