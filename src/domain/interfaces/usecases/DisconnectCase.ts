import { UseCase } from '@/utils/domain'

export abstract class DisconnectCase implements UseCase<Promise<void>> {
  abstract execute(): Promise<void>
}
