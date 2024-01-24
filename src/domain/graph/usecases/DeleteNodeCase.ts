import { DeleteNodeError } from '@/domain/errors/DeleteNodeError'
import { GraphRepository } from '@/domain/graph/repository/GraphRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = GraphRepository['deleteNode']

export abstract class DeleteNodeCase implements UseCase<Promise<void>> {
  abstract execute(nodeId: string): Promise<void>
}

export class DeleteNodeCaseImpl implements DeleteNodeCase {
  constructor(private deleteNode: Func) {}

  async execute(nodeId: string): Promise<void> {
    try {
      await this.deleteNode(nodeId)
    } catch {
      throw new DeleteNodeError()
    }
  }
}
