import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { GetGraphSizeCase } from '@/domain/interfaces/usecases/GetGraphSizeCase.interface'

type Func = GraphRepository['getGraphSize']

export class GetGraphSizeCaseImpl implements GetGraphSizeCase {
  constructor(private getGraphSize: Func) {}

  async execute(): Promise<number> {
    return await this.getGraphSize()
  }
}
