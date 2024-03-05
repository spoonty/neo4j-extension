import { DeleteNodeError } from '@/domain/errors/DeleteNodeError'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { DeleteNodeCase } from '@/domain/interfaces/usecases/DeleteNodeCase.interface'

type Func = GraphRepository['deleteNode']

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
