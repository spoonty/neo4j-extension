import { Node, NodeCreateDTO } from '@/domain/entities/Node'
import { CreateNodeError } from '@/domain/errors/CreateNodeError'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { CreateNodeCase } from '@/domain/interfaces/usecases/CreateNodeCase.interface'

type Func = GraphRepository['createNode']

export class CreateNodeCaseImpl implements CreateNodeCase {
  constructor(private createNode: Func) {}

  async execute(node: NodeCreateDTO): Promise<Node> {
    try {
      return await this.createNode(node)
    } catch {
      throw new CreateNodeError()
    }
  }
}
