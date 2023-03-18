import { DynamicModule, Provider } from '@nestjs/common';
import { RconModuleAsyncOptions, RconModuleOptions } from './rcon.interfaces';
export declare class RconCoreModule {
    static forRoot(options: RconModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: RconModuleAsyncOptions, connection: string): DynamicModule;
    static createAsyncProviders(options: RconModuleAsyncOptions, connection?: string): Provider[];
    static createAsyncOptionsProvider(options: RconModuleAsyncOptions, connection?: string): Provider;
}
