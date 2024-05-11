import { Graph } from '@/domain/entities/Graph'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { GetByTypesCase } from '@/domain/interfaces/usecases/GetByTypesCase'

type Func = GraphRepository['getByTypes']

export class GetByTypesCaseImpl implements GetByTypesCase {
  constructor(private getByTypes: Func) {}

  async execute(types: string[]): Promise<Graph> {
    try {
      return await this.getByTypes(types)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
