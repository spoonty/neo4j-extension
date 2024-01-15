import { ApplicationError } from '@/domain/errors/ApplicationError'

export class DeleteNodeError extends ApplicationError {
  public readonly message = 'Deleting node error.'
}
