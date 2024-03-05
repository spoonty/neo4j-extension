import { Container } from '@/features/graph/classes/Container'
import { Selection } from '@/features/graph/classes/Selection'

export class Group extends Selection<SVGGElement, unknown, null, undefined> {
  constructor(container: Container) {
    const group = container.get.append('g')

    super(group)
  }
}
