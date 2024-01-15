import { ApplicationError } from '@/domain/errors/ApplicationError'

export class UpdateNodeError extends ApplicationError {
  public readonly message = 'Error during node update.'
}
