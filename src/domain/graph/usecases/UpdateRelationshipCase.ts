import { UpdateNodeError } from '@/domain/errors/UpdateNodeError'
import { NodeD3, NodeUpdateDTO } from '@/domain/graph/models/Node'
import {RelationshipD3, RelationshipUpdateDTO} from '@/domain/graph/models/Relationship'
import { GraphRepository } from '@/domain/graph/repository/GraphRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = GraphRepository['updateRelationship']

export abstract class UpdateRelationshipCase
  implements
    UseCase<Promise<RelationshipD3>>
{
  abstract execute(
    relationshipId: string,
    relationship: RelationshipUpdateDTO
  ): Promise<RelationshipD3>
}

export class UpdateRelationshipCaseImpl implements UpdateRelationshipCase {
  constructor(private updateRelationship: Func) {}

  async execute(
    relationshipId: string,
    relationship: RelationshipUpdateDTO
  ): Promise<RelationshipD3> {
    try {
      return new RelationshipD3(await this.updateRelationship(relationshipId, relationship))
    } catch {
      throw new UpdateNodeError()
    }
  }
}
