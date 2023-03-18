import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { RconModuleAsyncOptions, RconModuleOptions, RconModuleOptionsFactory } from './rcon.interfaces'
import { createRconConnection, getRconConnectionToken, getRconOptionsToken } from './rcon.utils'

@Global()
@Module({})
export class RconCoreModule {
  public static forRoot(options: RconModuleOptions, connection?: string): DynamicModule {
    const rconOptionsProvider: Provider = {
      provide: getRconOptionsToken(connection),
      useValue: options,
    }

    const rconConnectionProvider: Provider = {
      provide: getRconConnectionToken(connection),
      useValue: createRconConnection(options),
    }

    return {
      module: RconCoreModule,
      providers: [rconOptionsProvider, rconConnectionProvider],
      exports: [rconOptionsProvider, rconConnectionProvider],
    }
  }

  public static forRootAsync(options: RconModuleAsyncOptions, connection: string): DynamicModule {
    const rconConnectionProvider: Provider = {
      provide: getRconConnectionToken(connection),
      useFactory(options: RconModuleOptions) {
        return createRconConnection(options)
      },
      inject: [getRconOptionsToken(connection)],
    }

    return {
      module: RconCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), rconConnectionProvider],
      exports: [rconConnectionProvider],
    }
  }

  public static createAsyncProviders(options: RconModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)]
    }

    return [this.createAsyncOptionsProvider(options, connection), { provide: options.useClass, useClass: options.useClass }]
  }

  public static createAsyncOptionsProvider(options: RconModuleAsyncOptions, connection?: string): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: getRconOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getRconOptionsToken(connection),
      async useFactory(optionsFactory: RconModuleOptionsFactory): Promise<RconModuleOptions> {
        return await optionsFactory.createRconModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
