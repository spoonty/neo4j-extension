export interface SessionRepository {
  connect(url: string, username: string, password: string): Promise<void>
}
