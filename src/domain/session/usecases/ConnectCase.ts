import { UseCase } from '@/utils/domain'
import {SessionRepository} from "@/domain/session/repository/SessionRepository.interface";
import {DriverError} from "@/domain/errors/DriverError";
import {Storage} from "@/data/storage/Storage.interface";

type Func = SessionRepository['connect']

export abstract class ConnectCase implements UseCase<Promise<void>> {
  abstract execute(url: string, username: string, password: string): Promise<void>
}

export class ConnectCaseImpl implements ConnectCase {
  constructor(private connect: Func, private storage: Storage) {}

  async execute(url: string, username: string, password: string): Promise<void> {
    try {
      await this.connect(url, username, password)

      this.storage.set('connection', {
        url,
        username,
        password
      })
    } catch {
      throw new DriverError()
    }
  }
}
