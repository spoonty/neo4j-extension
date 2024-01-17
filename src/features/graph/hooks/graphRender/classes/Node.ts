import { NodeD3 } from '@/domain/neo4j/models/Node'
import { InteractionState } from '@/features/graph/constants'
import { IGraphContext } from '@/features/graph/context'
import { drag } from '@/features/graph/helpers/drag'
import {
  defineLabelColor,
  getPropertyToDisplay,
} from '@/features/graph/helpers/labels'
import { clickZoom } from '@/features/graph/helpers/zoom'
import { Group } from '@/features/graph/hooks/graphRender/classes/Group'
import { NodeControlElement } from '@/features/graph/hooks/graphRender/classes/NodeControlElement'
import { Simulation } from '@/features/graph/hooks/graphRender/classes/Simulation'
import * as d3 from 'd3'
import { BaseType } from 'd3'

export class Node {
  private readonly node: d3.Selection<
    d3.BaseType | SVGGElement,
    NodeD3,
    SVGGElement,
    unknown
  >
  private readonly _deleteButton: NodeControlElement
  private readonly _editButton: NodeControlElement
  private readonly _relationshipButton: NodeControlElement

  constructor(
    nodes: NodeD3[],
    labels: string[],
    group: Group,
    simulation: Simulation,
  ) {
    this.node = group.get
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('data-element-id', (d: any) => d.elementId)

    this._deleteButton = new NodeControlElement(this, 'delete-button')
    this._deleteButton.position = { x: -55, y: 0 }

    this._relationshipButton = new NodeControlElement(this, 'relation-button')
    this._relationshipButton.position = { x: -33, y: -45 }

    this._editButton = new NodeControlElement(this, 'edit-button')
    this._editButton.position = { x: -49, y: -25 }

    this.node
      .append('circle')
      .attr('stroke', '#edeef0')
      .attr('stroke-width', 1.5)
      .attr('r', 40)
      .attr('fill', (d: any) => defineLabelColor(labels, d.labels[0]))
      .attr('class', 'node-circle')

    this.node
      .append('text')
      .text((d: any) => getPropertyToDisplay(d))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#17191b')
      .style('user-select', 'none')

    this.node.call(
      drag(simulation) as (
        selection: d3.Selection<
          BaseType | SVGGElement,
          NodeD3,
          SVGGElement,
          unknown
        >,
      ) => void,
    )

    this.node.on('mouseover', function () {
      d3.select(this)
        .attr('cursor', 'pointer')
        .select('.node-circle')
        .attr('stroke-width', 5)
        .style('stroke-opacity', 0.8)
    })

    this.node.on('mouseleave', function () {
      d3.select(this)
        .select('.node-circle')
        .attr('stroke-width', 1.5)
        .style('stroke-opacity', 1)
    })
  }

  public closeButtons(
    node?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    ;[this._editButton, this._relationshipButton, this._deleteButton].forEach(
      (button: NodeControlElement) => button.closeElement(node),
    )
  }

  public openButtons(
    node: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>,
  ) {
    this._editButton.openElement(node)
    this._relationshipButton.openElement(node)
    this._deleteButton.openElement(node)
  }

  public get get() {
    return this.node
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
}
