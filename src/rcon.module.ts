import { DynamicModule, Module } from '@nestjs/common'
import { RconCoreModule } from './rcon.core-module'
import { RconModuleAsyncOptions, RconModuleOptions } from './rcon.interfaces'

@Module({})
export class RconModule {
  public static forRoot(options: RconModuleOptions, connection?: string): DynamicModule {
    return {
      module: RconModule,
      imports: [RconCoreModule.forRoot(options, connection)],
      exports: [RconCoreModule],
    }
  }

  public static forRootAsync(options: RconModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: RconModule,
      imports: [RconCoreModule.forRootAsync(options, connection)],
      exports: [RconCoreModule],
    }
  }
}
