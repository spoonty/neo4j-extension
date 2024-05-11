import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'
import { UseCase } from '@/utils/domain'

export abstract class GetByTypesCase implements UseCase<Promise<Graph>> {
  abstract execute(types: string[]): Promise<Graph>
}
