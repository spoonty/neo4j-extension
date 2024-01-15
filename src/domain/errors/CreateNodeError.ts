import { ApplicationError } from '@/domain/errors/ApplicationError'

export class CreateNodeError extends ApplicationError {
  public readonly message = 'Error during node creation.'
}
