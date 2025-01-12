import { NodeD3 } from '@/domain/entities/Node'
import { Node } from '@/features/graph/classes/Node'
import { Relationship } from '@/features/graph/classes/Relationship'
import { Selection } from '@/features/graph/classes/Selection'
import * as d3 from 'd3'

export class ControlElement extends Selection<
  SVGGElement,
  NodeD3,
  SVGGElement,
  unknown
> {
  constructor(
    controller: Node | Relationship,
    private readonly className: string,
  ) {
    const element = controller.get
      .append('g')
      .attr('class', className)
      .attr('data-element-id', (d: any) => d.elementId)
      .attr('opacity', 0)

    super(element)

    this.selection
      .append('circle')
      .attr('r', 10)
      .attr('fill', 'white')
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('opacity', 0.05)

    this.selection
      .append('text')
      .attr('class', 'fa')
      .text(() => {
        switch (this.className) {
          case 'delete-button':
            return '\uf1f8'
          case 'edit-button':
            return '\uf304'
          default:
            return '\uf1e0'
        }
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
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
  }

  private _position: { x: number; y: number } = { x: 0, y: 0 }

  public set position({ x, y }: { x: number; y: number }) {
    this._position = { x, y }
  }

  public openElement(
    controller: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    controller
      .select(`.${this.className}`)
      .attr('transform', `translate(${this._position.x},${this._position.y})`)
      .style('opacity', 1)
  }

  public closeElement(
    controller?: d3.Selection<
      d3.BaseType | SVGGElement,
      unknown,
      null,
      unknown
    >,
  ) {
    if (controller) {
      controller
        .select(this.className)
        .attr('transform', `translate(0,0)`)
        .style('opacity', 0)
    } else {
      this.selection.attr('transform', `translate(0,0)`).style('opacity', 0)
    }
  }
}
