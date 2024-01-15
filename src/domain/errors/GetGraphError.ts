import { ApplicationError } from '@/domain/errors/ApplicationError'

export class GetGraphError extends ApplicationError {
  public readonly message = 'Error during getting graph.'
}
