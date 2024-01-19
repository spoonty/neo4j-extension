import { ApplicationError } from '@/domain/errors/ApplicationError'

export class UpdateRelationshipError extends ApplicationError {
  public readonly message = 'Error during relationship update.'
}
