import {RefObject, useCallback, useEffect, useRef, useState} from 'react'
import {NodeD3} from '@/domain/neo4j/models/Node'
import {useGraphContext} from '@/features/graph/context'
import {drag} from '@/features/graph/helpers/drag'
import {defineLabelColor, getPropertyToDisplay,} from '@/features/graph/helpers/labels'
import {clickZoom, zoom} from '@/features/graph/helpers/zoom'
import {InteractionState} from '@/features/graph/constants'
import * as d3 from 'd3'
import {BaseType} from 'd3'
import {RelationshipD3} from "@/domain/neo4j/models/Relationship";

export type NodeSimulation = d3.Simulation<
  NodeD3,
  d3.SimulationLinkDatum<NodeD3>
>

class Container {
  private readonly container: d3.Selection<SVGSVGElement | null, unknown, null, undefined>

  constructor(svg: RefObject<SVGSVGElement>) {
    this.container = d3
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

    this.container.selectAll('*').remove()
  }

  public get get() {
    return this.container
  }
}

export class Simulation {
  private readonly _simulation: d3.Simulation<NodeD3, undefined>

  constructor(nodes: NodeD3[], relationships: RelationshipD3[]) {
    this._simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(relationships)
          .id((d: any) => d.elementId)
          .distance(300),
      )
      .force('charge', d3.forceManyBody().strength(0))
  }

  public get simulation() {
    return this._simulation
  }
}

class Group {
  private readonly group: d3.Selection<SVGGElement, unknown, null, undefined>

  constructor(container: Container) {
    this.group = container.get.append('g')
  }

  public get get() {
    return this.group
  }
}

class ArrowMaker {
  private readonly arrow: d3.Selection<SVGMarkerElement, unknown, null, undefined>

  constructor(group: Group) {
    this.arrow = group
      .get
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 50)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')

    this.arrow
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('class', 'arrow-head')
      .attr('fill', '#edeef0')
  }

  public get get() {
    return this.arrow
  }
}

class Relationship {
  private readonly relationship: d3.Selection<d3.BaseType | SVGGElement, RelationshipD3, SVGGElement, unknown>

  constructor(relationships: RelationshipD3[], group: Group) {
    const arrowMaker = new ArrowMaker(group)

    this.relationship = group
      .get
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

class NodeControlElement {
  private readonly element: d3.Selection<SVGCircleElement, NodeD3, SVGGElement, unknown>
  private _position: { x: number, y: number } = { x: 0, y: 0 }

  constructor(node: Node, private readonly className: string) {
    this.element = node
      .get
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
  }

  public openElement(node: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>) {
    node
      .select(`.${this.className}`)
      .transition()
      .duration(500)
      .attr('cx', this._position.x)
      .attr('cy', this._position.y)
      .style('opacity', 1)
  }

  public closeElement(node?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>) {
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

  public set position({x, y}: { x: number, y: number }) {
    this._position = { x, y }
  }
}

class Node {
  private readonly node: d3.Selection<d3.BaseType | SVGGElement, NodeD3, SVGGElement, unknown>
  private readonly _deleteButton: NodeControlElement
  private readonly _editButton: NodeControlElement
  private readonly _relationshipButton: NodeControlElement

  constructor(nodes: NodeD3[], private readonly labels: string[], group: Group, simulation: Simulation) {
    this.node = group
      .get
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

    this.node
      .call(drag(simulation) as (selection: d3.Selection<BaseType | SVGGElement, NodeD3, SVGGElement, unknown>) => void)
  }

  public closeButtons(node?: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>) {
    [this._editButton, this._relationshipButton, this._deleteButton]
      .forEach((button: NodeControlElement) => button.closeElement(node))
  }

  public openButtons(node: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>) {
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


export const useGraphRender = (svg: RefObject<SVGSVGElement>) => {
  const {
    nodes,
    relationships,
    labels,
    clickHandler,
    setSource,
    setTarget,
    state,
  } = useGraphContext()

  const scale = useRef(1)
  const position = useRef({ x: 0, y: 0 })
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 })
  const [isAnimation, setIsAnimation] = useState(false)
  const optionsOpened = useRef(false)

  const render = useCallback(() => {
    if (!nodes || !relationships) {
      return
    }

    const container = new Container(svg)
    const simulation = new Simulation(nodes, relationships)
    const group = new Group(container)
    const relationship = new Relationship(relationships, group)
    const node = new Node(nodes, labels, group, simulation)

    node.get.on('click', function (event) {
      const currentNode = d3.select(this)

      switch (state.current) {
        case InteractionState.CREATE_RELATIONSHIP:
          setTarget(currentNode.attr('data-element-id'))
          break
        default:
          if (optionsOpened.current) return

          state.current = InteractionState.READ_NODE
          clickHandler({
            nodeId: currentNode.attr('data-element-id'),
          })

          if (optionsOpened.current) {
            node.closeButtons(currentNode)
          } else {
            node.openButtons(currentNode)
          }

          optionsOpened.current = !optionsOpened.current
          event.stopPropagation()

          return clickZoom(
            container.get,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            // @ts-ignore
            { x: currentNode.data()[0].x, y: currentNode.data()[0].y },
          )
      }
    })

    relationship.get.on('click', function () {
      const currentRelationship = d3.select(this)

      state.current = InteractionState.READ_RELATIONSHIP
      clickHandler({
        relationshipId: currentRelationship?.attr('data-element-id'),
      })

      // @ts-ignore
      const source = currentRelationship.data()[0].source
      // @ts-ignore
      const target = currentRelationship.data()[0].target

      return clickZoom(
        container.get,
        zoomHandler,
        { x: position.current.x, y: position.current.y, scale: scale.current },
        { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 },
      )
    })

    node.deleteButton.get.on('click', function (event) {
      event.stopPropagation()
      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.DELETE_NODE
      clickHandler({ nodeId })

      node.closeButtons()

      optionsOpened.current = false
    })

    node.relationshipButton.get.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      setSource(nodeId)

      node.closeButtons()

      optionsOpened.current = false
    })

    node.editButton.get.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.UPDATE_NODE
      clickHandler({ nodeId })

      node.closeButtons()

      optionsOpened.current = false
    })

    node.get.on('mouseover', function () {
      d3
        .select(this)
        .attr('cursor', 'pointer')
        .select('.node-circle')
        .attr('stroke-width', 5)
        .style("stroke-opacity", .8)
    })

    node.get.on('mouseleave', function () {
      d3
        .select(this)
        .select('.node-circle')
        .attr('stroke-width', 1.5)
        .style("stroke-opacity", 1)
    })

    // @ts-ignore
    const zoomHandler = zoom(group).on('zoom', (event) => {
      scale.current = event.transform.k
      position.current = { x: event.transform.x, y: event.transform.y }
      group.get.attr('transform', event.transform)
    })

    container.get
      // @ts-ignore
      .call(zoomHandler)
      .call(
        // @ts-ignore
        zoomHandler.transform,
        d3.zoomIdentity
          .translate(position.current.x, position.current.y)
          .scale(scale.current),
      )

    container.get.on('click', (event) => {
      const target = event.target as HTMLElement

      switch (target.tagName.toLowerCase()) {
        case 'svg':
          const handler = (x: number, y: number) => {
            clickHandler({ x, y })
            setClickedPosition({ x, y })
            setIsAnimation(true)
          }

          state.current = InteractionState.CREATE_NODE

          if (!isAnimation) {
            setTimeout(() => {
              svg.current?.dispatchEvent(
                new MouseEvent('click', { bubbles: false }),
              )
            }, 100)
          }

          let x = clickedPosition.x
          let y = clickedPosition.y

          return clickZoom(
            container.get,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            { x: x || d3.pointer(event)[0], y: y || d3.pointer(event)[1] },
            handler,
            {
              animation: isAnimation,
              finishAnimation: () => {
                setIsAnimation(false)
                setClickedPosition({ x: 0, y: 0 })
              },
            },
          )
      }

      if (optionsOpened.current) {
        node.closeButtons()

        optionsOpened.current = false
      }
    })

    simulation.simulation.on('tick', () => {
      relationship
        .get
        .select('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      relationship
        .get
        .select('text')
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      node.get.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
    })

    return simulation
  }, [nodes, relationships])

  useEffect(() => {
    render()
  }, [nodes, relationships])
}
