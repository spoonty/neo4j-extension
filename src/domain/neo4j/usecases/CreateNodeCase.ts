import { CreateNodeError } from '@/domain/errors/CreateNodeError'
import { NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = Neo4jRepository['createNode']

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
