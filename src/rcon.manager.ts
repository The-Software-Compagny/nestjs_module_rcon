import { Logger } from '@nestjs/common'
import { Rcon, RconOptions } from './rcon.interfaces'

export class RconManager {
  protected logger: Logger = new Logger(RconManager.name)

  private _initialized: boolean = false
  private _defaultClient: String | Symbol
  private _clients: Map<String | Symbol, Rcon> = new Map()

  public constructor(private readonly _options?: RconOptions) {
    this._defaultClient = 'default'
    this._clients.set('default', new Rcon(this._options))
  }

  public async initialize(): Promise<void> {
    try {
      await this._clients.get(this._defaultClient).connect()
    } catch (error) {
      this.logger.error('Error connecting to RCON server', error)
      setTimeout(() => {
        this.initialize()
      }, 5000)
    }
    this._initialized = true
  }

  public get clients(): Map<String | Symbol, Rcon> {
    return this._clients
  }

  public get defaultClient(): Rcon {
    return this._clients.get(this._defaultClient)
  }

  public get initialized(): boolean {
    return this._initialized
  }

  public getClient<T = {}>(name: String | Symbol): Rcon & T {
    if (!this.clients.has(name)) {
      throw new Error(`Rcon Connection ${name.toString()} not found`)
    }

    return this.clients.get(name) as Rcon & T
  }
}
