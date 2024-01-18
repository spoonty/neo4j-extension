import { Driver } from '@/data/driver/Driver.interface'
import * as neo4j from 'neo4j-driver'

const uri = 'neo4j+s://demo.neo4jlabs.com'
const user = 'movies'
const password = 'movies'

export class DriverImpl implements Driver {
  private driver: neo4j.Driver
  private session: neo4j.Session

  constructor() {
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    this.session = this.driver.session()
  }

  connect(): void {
    throw new Error('Method not implemented.')
  }
  disconnect(): void {
    throw new Error('Method not implemented.')
  }

  async execute<T>(query: string, payload?: any): Promise<T> {
    const result = await this.session.run(query, payload)
    return result.records.map((record: any) => record.toObject()) as T
  }
}
