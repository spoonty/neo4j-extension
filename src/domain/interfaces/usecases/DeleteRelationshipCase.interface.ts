import {UseCase} from "@/utils/domain";

export abstract class DeleteRelationshipCase implements UseCase<Promise<void>> {
    abstract execute(relationshipId: string): Promise<void>
}