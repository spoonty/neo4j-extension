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
}
