import { Node } from '@/domain/entities/Node'
import { UseCase } from '@/utils/domain'

export abstract class GetByLabelsCase implements UseCase<Promise<Array<Node>>> {
  abstract execute(labels: string[]): Promise<Array<Node>>
}
