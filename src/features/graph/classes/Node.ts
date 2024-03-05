import { NodeD3 } from '@/domain/entities/Node'
import { ControlElement } from '@/features/graph/classes/ControlElement'
import { Group } from '@/features/graph/classes/Group'
import { Selection } from '@/features/graph/classes/Selection'
import { Simulation } from '@/features/graph/classes/Simulation'
import { drag } from '@/features/graph/helpers/drag'
import { labelManager } from '@/features/labels/LabelManager'
import * as d3 from 'd3'
import { BaseType } from 'd3'

export class Node extends Selection<
  d3.BaseType | SVGGElement,
  any,
  SVGGElement,
  unknown
> {
  private readonly _deleteButton: ControlElement
  private readonly _editButton: ControlElement
  private readonly _relationshipButton: ControlElement
  private pressed = false

  constructor(nodes: NodeD3[], group: Group, simulation: Simulation) {
    const node = group.get
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('data-element-id', (d: any) => d.elementId)
      .attr('class', 'node')

    super(node)

    this.selection
      .append('circle')
      .attr('stroke', '#edeef0')
      .attr('stroke-width', 1.5)
      .attr('r', 40)
      .attr('fill', (d: any) => labelManager.getColor(d.labels[0]))
      .attr('class', 'node-circle')

    this.selection
      .append('text')
      .text((d: any) => labelManager.getPropertyToDisplay(d))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#17191b')
      .style('user-select', 'none')
      .style('white-space', 'pre')
      .call(this.wrap, 70)

    this.selection.call(
      drag(this, simulation) as (
        selection: d3.Selection<
          BaseType | SVGGElement,
          NodeD3,
          SVGGElement,
          unknown
        >,
      ) => void,
    )

    this.selection.on('mouseover', function () {
      const elementId = (d3.select(this).data()[0] as { elementId: string })
        .elementId

      d3.select(this)
        .attr('cursor', 'pointer')
        .select('.node-circle')
        .attr('stroke-width', 5)
        .style('stroke-opacity', 0.8)

      d3.selectAll('.relationship')
        .filter((d: any) => d.source.elementId !== elementId)
        .attr('opacity', 0.3)

      const connectedNodes = d3
        .selectAll('.relationship')
        .filter((d: any) => d.source.elementId === elementId)
        .data()
        .map((d: any) => d.target.elementId)

      const anotherNodes = d3
        .selectAll('.node')
        .filter(
          (d: any) =>
            !connectedNodes.includes(d.elementId) && d.elementId !== elementId,
        )

      if (
        d3.selectAll('.hover-circle').nodes().length ===
        anotherNodes.nodes().length
      ) {
        return
      }

      anotherNodes
        .append('circle')
        .attr('r', 40)
        .attr('fill', () => 'rgba(0, 0, 0, .5)')
        .attr('class', 'hover-circle')
    })

    this.selection.on('mouseleave', function (event: any) {
      const elementId = (d3.select(this).data()[0] as { elementId: string })
        .elementId

      d3.select(this)
        .select('.node-circle')
        .attr('stroke-width', 1.5)
        .style('stroke-opacity', 1)

      d3.selectAll('.relationship')
        .filter((d: any) => d.source.elementId !== elementId)
        .attr('opacity', 1)
      d3.selectAll('.hover-circle').remove()
    })

    this.selection.each(function (d: any) {
      d.fx = d.x
      d.fy = d.y
    })

    this._deleteButton = new ControlElement(this, 'delete-button')
    this._deleteButton.position = { x: -55, y: 0 }

    this._relationshipButton = new ControlElement(this, 'relation-button')
    this._relationshipButton.position = { x: -33, y: -45 }

    this._editButton = new ControlElement(this, 'edit-button')
    this._editButton.position = { x: -49, y: -25 }
  }

  public get relationshipButton() {
    return this._relationshipButton
  }

  public get editButton() {
    return this._editButton
  }

  public get deleteButton() {
    return this._deleteButton
  }

  public closeButtons(
    node?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    ;[this._editButton, this._relationshipButton, this._deleteButton].forEach(
      (button: ControlElement) => button.closeElement(node),
    )
  }

  public openButtons(
    node: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    this._editButton.openElement(node)
    this._relationshipButton.openElement(node)
    this._deleteButton.openElement(node)
  }

  private wrap(text: any, width: number) {
    text.each(function () {
      // @ts-ignore
      const node = d3.select(this)
      const words = node.text().split(/\s+/).reverse()
      let line: string[] = []
      const lineHeight = 0.4
      let lineNumber = 0

      node.text(null)

      let tspan = node.append('tspan')

      let word = words.pop()
      while (word && lineNumber < 1) {
        line.push(word)
        tspan.text(line.join(' '))

        if (tspan.node()!.getComputedTextLength() > width) {
          lineNumber++
          tspan.attr('y', -lineHeight + 'em')

          line.pop()
          tspan.text(line.join(' '))
          line = [word]
          tspan = node
            .append('tspan')
            .attr('x', 0)
            .attr('y', lineNumber * lineHeight + 'em')
            .attr('dy', lineNumber * lineHeight + 'em')
            .text(word)
        }

        word = words.pop()

        if (lineNumber >= 1 && word) {
          tspan.text(word + '...')
        }
      }
    })
  }
}
