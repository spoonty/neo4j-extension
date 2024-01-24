import { Driver } from '@/data/driver/Driver.interface'
import * as neo4j from 'neo4j-driver'
import {DriverError} from "@/domain/errors/DriverError";

export class DriverImpl implements Driver {
  private driver: ValueOrNull<neo4j.Driver> = null
  private session: ValueOrNull<neo4j.Session> = null

  isConnected(): boolean {
    return !!this.session
  }

  async connect(uri: string, user: string, password: string) {
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

    try {
      if (await this.driver.getServerInfo()) {
        this.session = this.driver.session()
      }
    } catch {
      throw new DriverError()
    }
  }
  async disconnect() {
    if (this.session) {
      await this.session.close()

      this.driver = null
      this.session = null
    }
  }

  async execute<T>(query: string, payload?: any): Promise<T> {
    if (!!this.session) {
      const result = await this.session.run(query, payload)
      return result.records.map((record: any) => record.toObject()) as T
    } else {
      throw new DriverError()
    }
  }
}
