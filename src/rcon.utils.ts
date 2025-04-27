import { RCON_MODULE_CONNECTION, RCON_MODULE_CONNECTION_TOKEN, RCON_MODULE_OPTIONS_TOKEN } from './rcon.constants'
import { Rcon, RconModuleOptions } from './rcon.interfaces'
import { RconManager } from './rcon.manager'

export function getRconOptionsToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_OPTIONS_TOKEN}`
}

export function getRconConnectionToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_CONNECTION_TOKEN}`
}

export async function createRconConnection(options: RconModuleOptions, attempts = 0): Promise<Rcon> {
  const { config } = options

  const manager = new RconManager(config)
  await manager.initialize()

  return manager.defaultClient
}
