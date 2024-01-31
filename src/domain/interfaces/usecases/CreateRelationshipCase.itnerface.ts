import {UseCase} from "@/utils/domain";
import {Relationship, RelationshipCreateDTO} from "@/domain/entities/Relationship";

export abstract class CreateRelationshipCase
    implements UseCase<Promise<Relationship>> {
    abstract execute(relationship: RelationshipCreateDTO): Promise<Relationship>
}
