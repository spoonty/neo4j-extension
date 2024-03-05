import { RefObject } from 'react'
import { Selection } from '@/features/graph/classes/Selection'
import * as d3 from 'd3'

export class Container extends Selection<
  SVGSVGElement | null,
  unknown,
  null,
  undefined
> {
  constructor(svg: RefObject<SVGSVGElement>) {
    const selection = d3
      .select(svg.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [
        -window.innerWidth / 2,
        -window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight,
      ])
      .attr('style', 'max-width: 100%; height: auto;')

    selection.selectAll('*').remove()

    super(selection)
  }
}
