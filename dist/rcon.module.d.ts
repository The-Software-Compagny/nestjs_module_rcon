import { DynamicModule } from '@nestjs/common';
import { RconModuleAsyncOptions, RconModuleOptions } from './rcon.interfaces';
export declare class RconModule {
    static forRoot(options: RconModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: RconModuleAsyncOptions, connection?: string): DynamicModule;
}
