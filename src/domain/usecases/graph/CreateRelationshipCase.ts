import {CreateRelationshipError} from '@/domain/errors/CreateRelationshipError'
import {Relationship, RelationshipCreateDTO} from '@/domain/entities/Relationship'
import {GraphRepository} from '@/domain/interfaces/repositories/GraphRepository.interface'
import {CreateRelationshipCase} from "@/domain/interfaces/usecases/CreateRelationshipCase.itnerface";

type Func = GraphRepository['createRelationship']

export class CreateRelationshipCaseImpl implements CreateRelationshipCase {
    constructor(private createRelationship: Func) {
    }

    async execute(relationship: RelationshipCreateDTO): Promise<Relationship> {
        try {
            return await this.createRelationship(relationship)
        } catch {
            throw new CreateRelationshipError()
        }
    }
}
