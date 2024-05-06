import { ApplicationError } from '@/domain/errors/ApplicationError'

export class DriverError extends ApplicationError {
  public readonly message =
    'An error occurred while connecting to the database. Check the entered information and try again.'
}
