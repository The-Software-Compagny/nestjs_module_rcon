"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var RconCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RconCoreModule = void 0;
const common_1 = require("@nestjs/common");
const rcon_utils_1 = require("./rcon.utils");
let RconCoreModule = RconCoreModule_1 = class RconCoreModule {
    static forRoot(options, connection) {
        const rconOptionsProvider = {
            provide: (0, rcon_utils_1.getRconOptionsToken)(connection),
            useValue: options,
        };
        const rconConnectionProvider = {
            provide: (0, rcon_utils_1.getRconConnectionToken)(connection),
            useValue: (0, rcon_utils_1.createRconConnection)(options),
        };
        return {
            module: RconCoreModule_1,
            providers: [rconOptionsProvider, rconConnectionProvider],
            exports: [rconOptionsProvider, rconConnectionProvider],
        };
    }
    static forRootAsync(options, connection) {
        const rconConnectionProvider = {
            provide: (0, rcon_utils_1.getRconConnectionToken)(connection),
            useFactory(options) {
                return (0, rcon_utils_1.createRconConnection)(options);
            },
            inject: [(0, rcon_utils_1.getRconOptionsToken)(connection)],
        };
        return {
            module: RconCoreModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options, connection), rconConnectionProvider],
            exports: [rconConnectionProvider],
        };
    }
    static createAsyncProviders(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options, connection)];
        }
        return [this.createAsyncOptionsProvider(options, connection), { provide: options.useClass, useClass: options.useClass }];
    }
    static createAsyncOptionsProvider(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useFactory) {
            return {
                provide: (0, rcon_utils_1.getRconOptionsToken)(connection),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: (0, rcon_utils_1.getRconOptionsToken)(connection),
            useFactory(optionsFactory) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield optionsFactory.createRconModuleOptions();
                });
            },
            inject: [options.useClass || options.useExisting],
        };
    }
};
RconCoreModule = RconCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RconCoreModule);
exports.RconCoreModule = RconCoreModule;
