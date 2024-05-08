import { Driver } from '@/data/interfaces/services/Driver.interface'
import { SessionRepository } from '@/domain/interfaces/repositories/SessionRepository.interface'

export class SessionRepositoryImpl implements SessionRepository {
  constructor(private driver: Driver) {}

  connect = async (url: string, username: string, password: string) => {
    await this.driver.connect(url, username, password)
  }

  disconnect = async () => {
    await this.driver.disconnect()
  }
}
