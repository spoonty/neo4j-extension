import { RelationshipD3 } from '@/domain/entities/Relationship'
import { ControlElement } from '@/features/graph/classes/ControlElement'
import { Group } from '@/features/graph/classes/Group'
import { Selection } from '@/features/graph/classes/Selection'
import * as d3 from 'd3'

export class Relationship extends Selection<
  d3.BaseType | SVGGElement,
  any,
  SVGGElement,
  unknown
> {
  private readonly _deleteButton: ControlElement | null = null
  private readonly _editButton: ControlElement | null = null

  constructor(relationships: RelationshipD3[], group: Group, withControl = true) {
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

    const relationship = group.get
      .append('g')
      .selectAll('g')
      .data(relationships)
      .join('g')
      .attr('data-element-id', (d: any) => d.elementId)
      .attr('cursor', 'pointer')
      .attr('class', 'relationship')

    relationship
      .append('line')
      .attr('stroke', '#edeef0')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))
      .attr('marker-end', 'url(#arrow)')

    relationship
      .append('text')
      .text((d: any) => d.type)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('user-select', 'none')
      .attr('fill', '#edeef0')

    super(relationship)

    if (withControl) {
      this._deleteButton = new ControlElement(this, 'delete-button')
      this._editButton = new ControlElement(this, 'edit-button')
    }
  }

  public get editButton() {
    return this._editButton
  }

  public get deleteButton() {
    return this._deleteButton
  }

  public closeButtons(
    relationship?: d3.Selection<
      d3.BaseType | SVGGElement,
      unknown,
      null,
      unknown
    >,
  ) {
    if (this._editButton && this._deleteButton) {
      [this._editButton, this._deleteButton].forEach((button: ControlElement) =>
        button.closeElement(relationship),
      )
    }
  }

  public openButtons(
    relationship: d3.Selection<
      d3.BaseType | SVGGElement,
      unknown,
      null,
      unknown
    >,
  ) {
    if (this._editButton && this._deleteButton) {
      const x = Number(relationship.select('text').attr('x'))
      const y = Number(relationship.select('text').attr('y'))
      this._deleteButton.position = { x: x + 15, y: y + 18 }
      this._editButton.position = { x: x - 15, y: y + 18 }
  
      this._editButton.openElement(relationship)
      this._deleteButton.openElement(relationship)
    }
  }
}
