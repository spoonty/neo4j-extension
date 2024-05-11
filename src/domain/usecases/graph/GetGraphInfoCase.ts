import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import {
  GetGraphInfoCase,
  Info,
} from '@/domain/interfaces/usecases/GetGraphInfoCase.interface'

export class GetGraphSizeCaseImpl implements GetGraphInfoCase {
  constructor(private repo: GraphRepository) {}

  async execute(): Promise<Info> {
    const size = await this.repo.getGraphSize()
    const labels = await this.repo.getLabels()
    const types = await this.repo.getTypes()

    return { size, labels, types }
  }
}
