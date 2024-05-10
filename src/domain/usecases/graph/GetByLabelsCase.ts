import { Node } from '@/domain/entities/Node'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { GetByLabelsCase } from '@/domain/interfaces/usecases/GetByLabelsCase.interface'

type Func = GraphRepository['getByLabels']

export class GetByLabelsCaseImpl implements GetByLabelsCase {
  constructor(private getByLabels: Func) {}

  async execute(labels: string[]): Promise<Array<Node>> {
    try {
      return await this.getByLabels(labels)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
