import {UseCase} from "@/utils/domain";
import {Node, NodeUpdateDTO} from "@/domain/entities/Node";

export abstract class UpdateNodeCase
    implements UseCase<Promise<Node>> {
    abstract execute(
        node: Node,
        updatedNode: NodeUpdateDTO,
    ): Promise<Node>
}