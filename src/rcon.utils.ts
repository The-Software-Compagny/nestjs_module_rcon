import { Rcon } from 'rcon-client'
import { RCON_MODULE_CONNECTION, RCON_MODULE_CONNECTION_TOKEN, RCON_MODULE_OPTIONS_TOKEN } from './rcon.constants'
import { RconModuleOptions } from './rcon.interfaces'

export function getRconOptionsToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_OPTIONS_TOKEN}`
}

export function getRconConnectionToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_CONNECTION_TOKEN}`
}

export async function createRconConnection(options: RconModuleOptions) {
  const { config } = options
  try {
    return await Rcon.connect(config)
  } catch (error) {
    console.error(error)
    setTimeout(() => {
      createRconConnection(options)
    }, 5000)
  }
}
