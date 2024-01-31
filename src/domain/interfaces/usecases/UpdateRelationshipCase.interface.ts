import {UseCase} from "@/utils/domain";
import {Relationship, RelationshipUpdateDTO} from "@/domain/entities/Relationship";

export abstract class UpdateRelationshipCase
    implements UseCase<Promise<Relationship>> {
    abstract execute(
        relationshipId: string,
        relationship: RelationshipUpdateDTO
    ): Promise<Relationship>
}