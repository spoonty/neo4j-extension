import { ApplicationError } from '@/domain/errors/ApplicationError'

export class DisconnectionError extends ApplicationError {
  public readonly message = 'Impossible to disconnect connection.'
}
