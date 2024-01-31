export interface Driver {
  isConnected(): boolean
  connect(uri: string, user: string, password: string): Promise<void>
  disconnect(): Promise<void>
  execute<T>(query: string, payload?: any): Promise<T>
}
