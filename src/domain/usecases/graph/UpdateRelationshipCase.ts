import {
  Relationship,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'
import { UpdateNodeError } from '@/domain/errors/UpdateNodeError'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { UpdateRelationshipCase } from '@/domain/interfaces/usecases/UpdateRelationshipCase.interface'

type Func = GraphRepository['updateRelationship']

export class UpdateRelationshipCaseImpl implements UpdateRelationshipCase {
  constructor(private updateRelationship: Func) {}

  async execute(
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ): Promise<Relationship> {
    try {
      return await this.updateRelationship(relationshipId, relationship)
    } catch {
      throw new UpdateNodeError()
    }
  }
}
