import { CreateNodeError } from '@/domain/errors/CreateNodeError'
import { NodeCreateDTO, NodeD3 } from '@/domain/graph/models/Node'
import { GraphRepository } from '@/domain/graph/repository/GraphRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = GraphRepository['createNode']

export abstract class CreateNodeCase implements UseCase<Promise<NodeD3>> {
  abstract execute(node: NodeCreateDTO): Promise<NodeD3>
}

export class CreateNodeCaseImpl implements CreateNodeCase {
  constructor(private createNode: Func) {}

  async execute(node: NodeCreateDTO): Promise<NodeD3> {
    try {
      return new NodeD3(await this.createNode(node))
    } catch {
      throw new CreateNodeError()
    }
  }
}
