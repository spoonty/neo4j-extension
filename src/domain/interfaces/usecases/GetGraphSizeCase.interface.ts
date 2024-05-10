import { UseCase } from '@/utils/domain'

export abstract class GetGraphSizeCase implements UseCase<Promise<number>> {
  abstract execute(): Promise<number>
}
