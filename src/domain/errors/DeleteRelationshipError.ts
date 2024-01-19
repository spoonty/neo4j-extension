import { ApplicationError } from '@/domain/errors/ApplicationError'

export class DeleteRelationshipError extends ApplicationError {
  public readonly message = 'Deleting relationship error.'
}
