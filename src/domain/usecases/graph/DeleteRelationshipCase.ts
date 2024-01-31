import {DeleteNodeError} from '@/domain/errors/DeleteNodeError'
import {GraphRepository} from '@/domain/interfaces/repositories/GraphRepository.interface'
import {DeleteRelationshipCase} from "@/domain/interfaces/usecases/DeleteRelationshipCase.interface";

type Func = GraphRepository['deleteRelationship']

export class DeleteRelationshipCaseImpl implements DeleteRelationshipCase {
    constructor(private deleteRelationship: Func) {
    }

    async execute(relationshipId: string): Promise<void> {
        try {
            await this.deleteRelationship(relationshipId)
        } catch {
            throw new DeleteNodeError()
        }
    }
}
