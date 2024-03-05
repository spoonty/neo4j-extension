import { RelationshipD3 } from '@/domain/entities/Relationship'
import { ControlElement } from '@/features/graph/hooks/graphRender/classes/ControlElement'
import { Group } from '@/features/graph/hooks/graphRender/classes/Group'
import * as d3 from 'd3'

export class Relationship {
  private readonly relationship: d3.Selection<
    d3.BaseType | SVGGElement,
    any,
    SVGGElement,
    unknown
  >
  private readonly _deleteButton: ControlElement
  private readonly _editButton: ControlElement

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
      .attr('class', 'relationship')

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

    this._deleteButton = new ControlElement(this, 'delete-button')
    this._editButton = new ControlElement(this, 'edit-button')
  }

  public get get() {
    return this.relationship
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
    ;[this._editButton, this._deleteButton].forEach((button: ControlElement) =>
      button.closeElement(relationship),
    )
  }

  public openButtons(
    relationship: d3.Selection<
      d3.BaseType | SVGGElement,
      unknown,
      null,
      unknown
    >,
  ) {
    const x = Number(relationship.select('text').attr('x'))
    const y = Number(relationship.select('text').attr('y'))
    this._deleteButton.position = { x: x + 15, y: y + 18 }
    this._editButton.position = { x: x - 15, y: y + 18 }

    this._editButton.openElement(relationship)
    this._deleteButton.openElement(relationship)
  }
}
