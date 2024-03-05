import { Graph } from '@/domain/entities/Graph'
import { UseCase } from '@/utils/domain'

export abstract class GetByRangeCase implements UseCase<Promise<Graph>> {
  abstract execute(rangeNumber: number): Promise<Graph>
}
