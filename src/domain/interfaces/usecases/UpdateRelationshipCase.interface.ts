import {
  Relationship,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'
import { UseCase } from '@/utils/domain'

export abstract class UpdateRelationshipCase
  implements UseCase<Promise<Relationship>>
{
  abstract execute(
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ): Promise<Relationship>
}
