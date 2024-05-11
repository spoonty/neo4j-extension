import { Graph } from '@/domain/entities/Graph'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { GetByDegreeCase } from '@/domain/interfaces/usecases/GetByDegreeCase'

type Func = GraphRepository['getByDegree']

export class GetByDegreeCaseImpl implements GetByDegreeCase {
  constructor(private getByDegree: Func) {}

  async execute(degree: number): Promise<Graph> {
    try {
      return await this.getByDegree(degree)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
