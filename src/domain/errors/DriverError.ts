import { ApplicationError } from '@/domain/errors/ApplicationError'

export class DriverError extends ApplicationError {
  public readonly message =
    'Error with database connection. Try to connect again'
}
