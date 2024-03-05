import { Node, NodeUpdateDTO } from '@/domain/entities/Node'
import { UseCase } from '@/utils/domain'

export abstract class UpdateNodeCase implements UseCase<Promise<Node>> {
  abstract execute(node: Node, updatedNode: NodeUpdateDTO): Promise<Node>
}
