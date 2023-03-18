<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A RCON module for Nest framework (node.js) using <a href="https://github.com/janispritzkau/rcon-client">rcon-client</a> library
</p>

<p align="center">
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/v/@streamkits/nestjs-module-rcon.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/org/streamkits"><img src="https://img.shields.io/npm/l/@streamkits/nestjs-module-rcon.svg" alt="Package License" /></a>
  <a href="https://github.com/StreamKITS/nestjs-module-rcon/actions/workflows/ci.yml"><img src="https://github.com/StreamKITS/nestjs-module-rcon/actions/workflows/ci.yml/badge.svg" alt="Publish Package to npmjs" /></a>
</p>
<br>

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
