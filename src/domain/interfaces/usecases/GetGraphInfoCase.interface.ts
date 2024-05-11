import { UseCase } from '@/utils/domain'

export type Info = {
  size: number
  labels: string[]
  types: string[]
}

export abstract class GetGraphInfoCase implements UseCase<Promise<Info>> {
  abstract execute(): Promise<Info>
}
