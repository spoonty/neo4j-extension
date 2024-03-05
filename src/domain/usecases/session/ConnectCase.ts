import { Storage } from '@/data/interfaces/services/Storage.interface'
import { DriverError } from '@/domain/errors/DriverError'
import { SessionRepository } from '@/domain/interfaces/repositories/SessionRepository.interface'
import { ConnectCase } from '@/domain/interfaces/usecases/ConnectCase.interface'
import { localStorageKeys } from '@/features/session/static/keys'

type Func = SessionRepository['connect']

export class ConnectCaseImpl implements ConnectCase {
  constructor(
    private connect: Func,
    private storage: Storage,
  ) {}

  async execute(
    url: string,
    username: string,
    password: string,
  ): Promise<void> {
    try {
      await this.connect(url, username, password)

      this.storage.set(localStorageKeys.connection, {
        url,
        username,
        password,
      })
    } catch {
      this.storage.delete(localStorageKeys.connection)

      throw new DriverError()
    }
  }
}
