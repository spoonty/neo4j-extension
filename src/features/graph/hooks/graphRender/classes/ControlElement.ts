import { NodeD3 } from '@/domain/neo4j/models/Node'
import { Node } from '@/features/graph/hooks/graphRender/classes/Node'
import * as d3 from 'd3'
import {Relationship} from "@/features/graph/hooks/graphRender/classes/Relationship";

export class ControlElement {
  private readonly element: d3.Selection<
    SVGGElement,
    NodeD3,
    SVGGElement,
    unknown
  >
  private _position: { x: number; y: number } = { x: 0, y: 0 }

  constructor(
    controller: Node | Relationship,
    private readonly className: string,
  ) {
    this.element = controller.get
      .append('g')
      .attr('class', className)
      .attr('data-element-id', (d: any) => d.elementId)
      .attr('opacity', 0)

    this.element
      .append('circle')
      .attr('r', 10)
      .attr('fill', 'white')
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('opacity', 0.05)

    this.element
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

  public openElement(
    controller: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    controller
      .select(`.${this.className}`)
      .attr('transform', `translate(${this._position.x},${this._position.y})`)
      .style('opacity', 1)
  }

  public closeElement(
    controller?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    if (controller) {
      controller
        .select(this.className)
        .attr('transform', `translate(0,0)`)
        .style('opacity', 0)
    } else {
      this.element
        .attr('transform', `translate(0,0)`)
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
