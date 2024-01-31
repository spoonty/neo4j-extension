import {UseCase} from "@/utils/domain";
import {Node, NodeCreateDTO} from "@/domain/entities/Node";

export abstract class CreateNodeCase implements UseCase<Promise<Node>> {
    abstract execute(node: NodeCreateDTO): Promise<Node>
}