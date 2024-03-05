import { Node, NodeCreateDTO } from '@/domain/entities/Node'
import { UseCase } from '@/utils/domain'

export abstract class CreateNodeCase implements UseCase<Promise<Node>> {
  abstract execute(node: NodeCreateDTO): Promise<Node>
}
