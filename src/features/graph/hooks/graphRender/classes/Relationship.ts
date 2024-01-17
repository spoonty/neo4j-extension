import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { Group } from '@/features/graph/hooks/graphRender/classes/Group'
import * as d3 from 'd3'

export class Relationship {
  private readonly relationship: d3.Selection<
    d3.BaseType | SVGGElement,
    RelationshipD3,
    SVGGElement,
    unknown
  >

  constructor(relationships: RelationshipD3[], group: Group) {
    const arrowMaker = group.get
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 50)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')

    arrowMaker
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('class', 'arrow-head')
      .attr('fill', '#edeef0')

    this.relationship = group.get
      .append('g')
      .selectAll('g')
      .data(relationships)
      .join('g')
      .attr('data-element-id', (d: any) => d.elementId)
      .attr('cursor', 'pointer')

    this.relationship
      .append('line')
      .attr('stroke', '#edeef0')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))
      .attr('marker-end', 'url(#arrow)')

    this.relationship
      .append('text')
      .text((d: any) => d.type)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('user-select', 'none')
      .attr('fill', '#edeef0')
  }

  public get get() {
    return this.relationship
  }
}
