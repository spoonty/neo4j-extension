import { Container } from '@/features/graph/hooks/graphRender/classes/Container'
import * as d3 from 'd3'

export class Group {
  private readonly group: d3.Selection<SVGGElement, unknown, null, undefined>

  constructor(container: Container) {
    this.group = container.get.append('g')
  }

  public get get() {
    return this.group
  }
}
