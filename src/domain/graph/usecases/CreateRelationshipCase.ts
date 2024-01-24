import { CreateRelationshipError } from '@/domain/errors/CreateRelationshipError'
import {
  RelationshipCreateDTO,
  RelationshipD3,
} from '@/domain/graph/models/Relationship'
import { GraphRepository } from '@/domain/graph/repository/GraphRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = GraphRepository['createRelationship']

export abstract class CreateRelationshipCase
  implements UseCase<Promise<RelationshipD3>>
{
  abstract execute(relationship: RelationshipCreateDTO): Promise<RelationshipD3>
}

export class CreateRelationshipCaseImpl implements CreateRelationshipCase {
  constructor(private createRelationship: Func) {}

  async execute(relationship: RelationshipCreateDTO): Promise<RelationshipD3> {
    try {
      return new RelationshipD3(await this.createRelationship(relationship))
    } catch {
      throw new CreateRelationshipError()
    }
  }
}
