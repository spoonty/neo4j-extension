import {RefObject, useCallback, useEffect, useRef, useState} from 'react'
import {NodeD3} from '@/domain/neo4j/models/Node'
import {useGraphContext} from '@/features/graph/context'
import {drag} from '@/features/graph/helpers/drag'
import {defineLabelColor, getPropertyToDisplay,} from '@/features/graph/helpers/labels'
import {clickZoom, zoom} from '@/features/graph/helpers/zoom'
import {InteractionState} from '@/features/graph/hooks/useGraph'
import * as d3 from 'd3'

export type NodeSimulation = d3.Simulation<
  NodeD3,
  d3.SimulationLinkDatum<NodeD3>
>

export const useGraphRender = (svg: RefObject<SVGSVGElement>) => {
  const {
    nodes,
    relations,
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
    if (!nodes || !relations) {
      return
    }

    const container = d3
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

    container.selectAll('*').remove()

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(relations)
          .id((d: any) => d.elementId)
          .distance(300),
      )
      .force('charge', d3.forceManyBody().strength(0))

    const group = container.append('g')

    const arrowMarker = group
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 50)
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('orient', 'auto')

    arrowMarker
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('class', 'arrow-head')
      .attr('fill', '#edeef0')

    const relation = group.append('g').selectAll('g').data(relations).join('g')

    relation
      .append('line')
      .attr('stroke', '#edeef0')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))
      .attr('marker-end', 'url(#arrow)')

    relation
      .append('text')
      .text((d: any) => d.type)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('user-select', 'none')
      .attr('fill', '#edeef0')

    const node = group
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('data-element-id', (d: any) => d.elementId)

    const deleteButton = node
      .append('circle')
      .attr('class', 'delete-button')
      .attr('r', 10)
      .attr('fill', 'red')
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('opacity', 0)
      .attr('data-element-id', (d: any) => d.elementId)

    const relationButton = node
      .append('circle')
      .attr('class', 'edit-button')
      .attr('r', 10)
      .attr('fill', '#bdbdbd')
      .attr('cy', 0)
      .attr('cx', 0)
      .attr('opacity', 0)
      .attr('data-element-id', (d: any) => d.elementId)

    node
      .append('circle')
      .attr('stroke', '#edeef0')
      .attr('stroke-width', 1.5)
      .attr('r', 40)
      .attr('fill', (d: any) => defineLabelColor(labels, d.labels[0]))

    node
      .append('text')
      .text((d: any) => getPropertyToDisplay(d))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#17191b')
      .style('user-select', 'none')

    // @ts-ignore
    node.call(drag(simulation))

    node.on('click', function (event) {
      switch (state.current) {
        case InteractionState.CREATE_RELATION:
          const nodeId = d3.select(this).attr('data-element-id')
          setTarget(nodeId)
          break
        default:
          if (optionsOpened.current) return

          const currentNode = d3.select(this)

          const deleteButton = currentNode.select('.delete-button')
          deleteButton
            .transition()
            .duration(500)
            .attr('cx', optionsOpened.current ? 0 : -49)
            .attr('cy', optionsOpened.current ? 0 : -25)
            .style('opacity', optionsOpened.current ? 0 : 1)

          const relationButton = currentNode.select('.edit-button')
          relationButton
            .transition()
            .duration(500)
            .attr('cx', optionsOpened.current ? 0 : -30)
            .attr('cy', optionsOpened.current ? 0 : -45)
            .style('opacity', optionsOpened.current ? 0 : 1)

          optionsOpened.current = !optionsOpened.current
          event.stopPropagation()

          return clickZoom(
            container,
            zoomHandler,
            { x: position.current.x, y: position.current.y, scale: scale.current },
            // @ts-ignore
            { x: currentNode.data()[0].x, y: currentNode.data()[0].y }
          )
      }
    })

    deleteButton.on('click', function (event) {
      event.stopPropagation()
      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.DELETE_NODE
      clickHandler<{ nodeId: string }>({ nodeId })

      deleteButton
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)
      relationButton
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)

      optionsOpened.current = false
    })

    relationButton.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      setSource(nodeId)

      deleteButton
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)
      relationButton
        .transition()
        .duration(500)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('opacity', 0)

      optionsOpened.current = false
    })

    node.on('mouseover', function () {
      d3.select(this).attr('cursor', 'pointer')
    })

    // @ts-ignore
    const zoomHandler = zoom(group).on('zoom', (event) => {
      scale.current = event.transform.k
      position.current = { x: event.transform.x, y: event.transform.y }
      group.attr('transform', event.transform)
    })

    container
      // @ts-ignore
      .call(zoomHandler)
      .call(
        // @ts-ignore
        zoomHandler.transform,
        d3.zoomIdentity
          .translate(position.current.x, position.current.y)
          .scale(scale.current),
      )

    container.on('click', (event) => {
      // let handler: () => void
      const target = event.target as HTMLElement

      switch (target.tagName.toLowerCase()) {
        case 'svg':
          const handler = (x: number, y: number) => {
            clickHandler<{ x: number, y: number }>({x, y})
            setClickedPosition({ x, y })
            setIsAnimation(true)
          }

          let x = clickedPosition.x
          let y = clickedPosition.y

          return clickZoom(
            container,
            zoomHandler,
            { x: position.current.x, y: position.current.y, scale: scale.current },
            // @ts-ignore
            { x: x || d3.pointer(event)[0], y: y || d3.pointer(event)[1] },
            handler,
            { animation: isAnimation, finishAnimation: () => setIsAnimation(false) }
          )
      }

      if (optionsOpened.current) {
        deleteButton
          .transition()
          .duration(500)
          .attr('cx', 0)
          .attr('cy', 0)
          .style('opacity', 0)
        relationButton
          .transition()
          .duration(500)
          .attr('cx', 0)
          .attr('cy', 0)
          .style('opacity', 0)

        optionsOpened.current = false
      }
    })

    simulation.on('tick', () => {
      relation
        .select('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      relation
        .select('text')
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
    })

    return simulation
  }, [nodes, relations])

  useEffect(() => {
    render()
  }, [nodes, relations])
}
