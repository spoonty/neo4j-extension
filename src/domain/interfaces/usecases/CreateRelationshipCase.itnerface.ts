import {
  Relationship,
  RelationshipCreateDTO,
} from '@/domain/entities/Relationship'
import { UseCase } from '@/utils/domain'

export abstract class CreateRelationshipCase
  implements UseCase<Promise<Relationship>>
{
  abstract execute(relationship: RelationshipCreateDTO): Promise<Relationship>
}
