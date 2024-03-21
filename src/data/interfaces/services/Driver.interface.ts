import { Connection } from "@/features/session/static/const"

export interface Driver {
  getConnection(): Connection
  connect(uri: string, user: string, password: string): Promise<void>
  disconnect(): Promise<void>
  execute<T>(query: string, payload?: any): Promise<T>
}
