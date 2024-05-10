import { Graph } from '@/domain/entities/Graph'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { GetByRangeCase } from '@/domain/interfaces/usecases/GetByRangeCase.interface'

type Func = GraphRepository['getByRange']

export class GetByRangeCaseImpl implements GetByRangeCase {
  constructor(private getByRangeFunc: Func) {}

  async execute(page: number, pageSize: number): Promise<Graph> {
    return await this.getByRangeFunc(page, pageSize)
  }
}
