export interface Driver {
  connect(): void
  disconnect(): void
  execute<T>(query: string, payload?: any): Promise<T>
}
