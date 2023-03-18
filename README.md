# NestJS RCON Module
RCON module for NestJS Framework

## Install dependencies
```bash
yarn add @streamkits/nestjs-module-rcon rcon-client
```
## Instanciate
```ts
RconModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    config: config.get<RconOptions>('rcon.options'),
  }),
})
```
