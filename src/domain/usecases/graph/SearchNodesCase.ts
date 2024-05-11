import { Node } from '@/domain/entities/Node'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { SearchNodesCase } from '@/domain/interfaces/usecases/SearchNodesCase'

type Func = GraphRepository['searchNodes']

export class SearchNodesCaseImpl implements SearchNodesCase {
  constructor(private searchNodes: Func) {}

  async execute(key: string, value: string): Promise<Array<Node>> {
    try {
      return await this.searchNodes(key, value)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
