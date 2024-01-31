import {UpdateNodeError} from '@/domain/errors/UpdateNodeError'
import {Node, NodeUpdateDTO} from '@/domain/entities/Node'
import {GraphRepository} from '@/domain/interfaces/repositories/GraphRepository.interface'
import {UpdateNodeCase} from "@/domain/interfaces/usecases/UpdateNodeCase.interface";

type Func = GraphRepository['updateNode']

export class UpdateNodeCaseImpl implements UpdateNodeCase {
    constructor(private updateNode: Func) {
    }

    async execute(
        node: Node,
        updatedNode: NodeUpdateDTO,
    ): Promise<Node> {
        try {
            return await this.updateNode(node.elementId, updatedNode)
        } catch {
            throw new UpdateNodeError()
        }
    }

    // private parseRelationships(node: NodeD3, relationships: RelationshipD3[]) {
    //     const parsedRelationships: RelationshipD3[] = []
    //
    //     relationships.forEach((relationship) => {
    //         if (relationship.endNodeElementId === node.elementId) {
    //             relationship.target = node.elementId
    //         } else if (relationship.startNodeElementId === node.elementId) {
    //             relationship.source = node.elementId
    //         }
    //
    //         parsedRelationships.push(relationship)
    //     })
    //
    //     return parsedRelationships
    // }
}
