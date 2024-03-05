import { Graph } from '@/domain/entities/Graph'
import { UseCase } from '@/utils/domain'

export abstract class GetGraphCase implements UseCase<Promise<Graph>> {
  abstract execute(): Promise<Graph>
}
