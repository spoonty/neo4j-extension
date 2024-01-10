import {ApplicationError} from "@/domain/errors/ApplicationError";

export class CreateRelationshipError extends ApplicationError {
  public readonly message = 'Relationship creation error.'
}