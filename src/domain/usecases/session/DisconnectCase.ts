import { Storage } from '@/data/interfaces/services/Storage.interface'
import { DisconnectionError } from '@/domain/errors/DisconnectionError'
import { SessionRepository } from '@/domain/interfaces/repositories/SessionRepository.interface'
import { DisconnectCase } from '@/domain/interfaces/usecases/DisconnectCase'
import { localStorageKeys } from '@/features/session/static/keys'

type Func = SessionRepository['disconnect']

export class DisconnectCaseImpl implements DisconnectCase {
  constructor(
    private disconnect: Func,
    private storage: Storage,
  ) {}

  async execute() {
    try {
      await this.disconnect()

      this.storage.delete(localStorageKeys.connection)
      this.storage.delete(localStorageKeys.labels)
    } catch {
      throw new DisconnectionError()
    }
  }
}
