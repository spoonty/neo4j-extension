import {SessionRepository} from "@/domain/session/repository/SessionRepository.interface";
import {Driver} from "@/data/driver/Driver.interface";

export class SessionRepositoryImpl implements SessionRepository {
  constructor(private driver: Driver) {}

  connect = async (url: string, username: string, password: string) => {
    await this.driver.connect(url, username, password)
  }
}