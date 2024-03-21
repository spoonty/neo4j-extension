import { Driver } from '@/data/interfaces/services/Driver.interface'
import { DriverError } from '@/domain/errors/DriverError'
import { Connection } from '@/features/session/static/const'
import * as neo4j from 'neo4j-driver'

export class DriverImpl implements Driver {
  private driver: ValueOrNull<neo4j.Driver> = null
  private session: ValueOrNull<neo4j.Session> = null
  private canEdit = false

  getConnection(): Connection {
    if (!this.session) {
      return Connection.NONE
    }

    return this.canEdit ? Connection.FULL : Connection.READ_ONLY
  }

  async connect(uri: string, user: string, password: string) {
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

    try {
      if (await this.driver.getServerInfo()) {
        this.session = this.driver.session()
      }

      await this.checkAccess()
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

  private checkAccess = async () => {
    const currentUser = await this.execute('CALL dbms.showCurrentUser()');

    if (currentUser) {
      this.canEdit = currentUser[0].roles.includes('admin')
    }
  }
}
