import { Inject } from '@nestjs/common'
import { getRconConnectionToken } from './rcon.utils'

export const InjectRcon = (connection?: string) => {
  return Inject(getRconConnectionToken(connection))
}
