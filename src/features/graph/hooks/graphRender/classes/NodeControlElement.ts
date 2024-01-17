import { NodeD3 } from '@/domain/neo4j/models/Node'
import { Node } from '@/features/graph/hooks/graphRender/classes/Node'
import * as d3 from 'd3'

export class NodeControlElement {
  private readonly element: d3.Selection<
    SVGCircleElement,
    NodeD3,
    SVGGElement,
    unknown
  >
  private _position: { x: number; y: number } = { x: 0, y: 0 }

  constructor(
    node: Node,
    private readonly className: string,
  ) {
    this.element = node.get
      .append('circle')
      .attr('class', className)
      .attr('r', 10)
      .attr('fill', () => {
        switch (this.className) {
          case 'delete-button':
            return 'red'
          case 'edit-button':
            return '#1E88E5'
          default:
            return '#bdbdbd'
        }
      })
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('opacity', 1)
      .attr('data-element-id', (d: any) => d.elementId)

    const a = 3
  }

  public openElement(
    node: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    node
      .select(`.${this.className}`)
      .transition()
      .duration(500)
      .attr('cx', this._position.x)
      .attr('cy', this._position.y)
      .style('opacity', 1)
  }

  public closeElement(
    node?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    if (node) {
      node
        .select(this.className)
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)
    } else {
      this.element
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)
    }
  }

  public get get() {
    return this.element
  }

  public set position({ x, y }: { x: number; y: number }) {
    this._position = { x, y }
  }
}
