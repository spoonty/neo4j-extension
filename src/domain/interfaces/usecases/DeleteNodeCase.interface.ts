import { UseCase } from '@/utils/domain'

export abstract class DeleteNodeCase implements UseCase<Promise<void>> {
  abstract execute(nodeId: string): Promise<void>
}
