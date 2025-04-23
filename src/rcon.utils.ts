import { Rcon } from 'rcon-client'
import { RCON_MODULE_CONNECTION, RCON_MODULE_CONNECTION_TOKEN, RCON_MODULE_OPTIONS_TOKEN } from './rcon.constants'
import { RconModuleOptions } from './rcon.interfaces'
import { Logger } from '@nestjs/common'

export function getRconOptionsToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_OPTIONS_TOKEN}`
}

export function getRconConnectionToken(connection: string): string {
  return `${connection || RCON_MODULE_CONNECTION}_${RCON_MODULE_CONNECTION_TOKEN}`
}

export async function createRconConnection(options: RconModuleOptions, attempts = 0): Promise<Rcon> {
  const { config } = options
  options.failOnError = typeof options.failOnError === 'boolean' ? options.failOnError : true
  options.maxAttempts = options.maxAttempts || 3
  options.retryDelay = options.retryDelay || 5_000

  try {
    return await Rcon.connect(config)
  } catch (err) {
    Logger.error('Error connecting to RCON', 'RconModule')
    if (Array.isArray(err.errors) && err.errors.length > 0) {
      for (const error of err.errors || []) {
        Logger.verbose(error, 'RconModule')
      }
    } else {
      Logger.verbose(err, 'RconModule')
    }

    attempts++
    if (attempts > options.maxAttempts) {
      if (options.failOnError) {
        Logger.error('Failed to connect to RCON', 'RconModule')
        Logger.error(`Max attempts reached (${options.maxAttempts})`, 'RconModule')
        Logger.fatal(err.message, 'RconModule')
        const e = new Error('Failed to connect to RCON !')
        e.name = 'RconConnectionError'
        e.stack = err.stack
        e.message = err.message

        throw e
      }
      return null
    }

    Logger.warn(`Retrying in 5 seconds... (attempt ${attempts}/${options.maxAttempts})`, 'RconModule')
    setTimeout(async () => {
      return await createRconConnection(options, attempts)
    }, options.retryDelay)
  }
}
