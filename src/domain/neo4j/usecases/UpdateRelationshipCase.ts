import { UpdateNodeError } from '@/domain/errors/UpdateNodeError'
import { NodeD3, NodeUpdateDTO } from '@/domain/neo4j/models/Node'
import {RelationshipD3, RelationshipUpdateDTO} from '@/domain/neo4j/models/Relationship'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = Neo4jRepository['updateRelationship']

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
