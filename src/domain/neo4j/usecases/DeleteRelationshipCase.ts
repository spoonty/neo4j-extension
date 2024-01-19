import { DeleteNodeError } from '@/domain/errors/DeleteNodeError'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = Neo4jRepository['deleteRelationship']

export abstract class DeleteRelationshipCase implements UseCase<Promise<void>> {
  abstract execute(relationshipId: string): Promise<void>
}

export class DeleteRelationshipCaseImpl implements DeleteRelationshipCase {
  constructor(private deleteRelationship: Func) {}

  async execute(relationshipId: string): Promise<void> {
    try {
      await this.deleteRelationship(relationshipId)
    } catch {
      throw new DeleteNodeError()
    }
  }
}
