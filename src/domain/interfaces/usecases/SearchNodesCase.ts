import { Node } from '@/domain/entities/Node'
import { UseCase } from '@/utils/domain'

export abstract class SearchNodesCase implements UseCase<Promise<Array<Node>>> {
  abstract execute(key: string, value: string): Promise<Array<Node>>
}
