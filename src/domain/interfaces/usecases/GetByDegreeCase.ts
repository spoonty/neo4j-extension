import { Graph } from '@/domain/entities/Graph'
import { UseCase } from '@/utils/domain'

export abstract class GetByDegreeCase implements UseCase<Promise<Graph>> {
  abstract execute(degree: number): Promise<Graph>
}
