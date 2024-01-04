import { RefObject, useEffect, useRef, useState } from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationD3 } from '@/domain/neo4j/models/Relation'
import { drag } from '@/features/graph/helpers/drag'
import { zoom } from '@/features/graph/helpers/zoom'
import * as d3 from 'd3'

const getPropertyToDisplay = (node: any) => {
  const keys = Object.keys(node.properties)

  if (keys.includes('name')) {
    return node.properties['name']
  }

  if (keys.includes('title')) {
    return node.properties['title']
  }

  return node.properties[keys[0]]
}

export type NodeSimulation = d3.Simulation<
  NodeD3,
  d3.SimulationLinkDatum<NodeD3>
>

const useGraph = (
  svg: RefObject<SVGSVGElement>,
  nodes: NodeD3[] | null,
  relations: RelationD3[] | null,
  clickHandler?: (x: number, y: number) => void,
) => {
  const scale = useRef(1)
  const position = useRef({ x: 0, y: 0 })
  const [clicked, setClicked] = useState({ x: 0, y: 0 })
  const [animation, setAnimation] = useState(false)

  const init = () => {
    if (!nodes || !relations) {
      return
    }

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const xExtent = d3.extent(nodes, (d: any) => d.x)
    const yExtent = d3.extent(nodes, (d: any) => d.y)

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

    const relation = group
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('g')
      .data(relations)
      .join('g')

    relation
      .append('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))
      .attr('marker-end', 'url(#arrow)')

    relation
      .append('text')
      .text((d: any) => d.type)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('user-select', 'none')

    const node = group.append('g').selectAll('g').data(nodes).join('g')

    node
      .append('circle')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('r', 40)
      .attr('fill', (d: any) => color(d.labels[0]))

    node
      .append('text')
      .text((d: any) => getPropertyToDisplay(d))
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', 'white')
      .style('user-select', 'none')

    // @ts-ignore
    node.call(drag(simulation))

    // @ts-ignore
    const zoomHandler = zoom(group).on('zoom', (event) => {
      scale.current = event.transform.k
      position.current = { x: event.transform.x, y: event.transform.y }
      group.attr('transform', event.transform)
    })

    // @ts-ignore
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
      if (!animation) {
        const [x, y] = d3.pointer(event)

        const distanceX = (x - position.current.x) / scale.current
        const distanceY = (y - position.current.y) / scale.current

        clickHandler?.(distanceX, distanceY)
        setClicked({ x: distanceX, y: distanceY })

        setAnimation(true)
        return
      }

      const scaleFactor = 3

      const deltaX = -window.innerWidth / (4 * scaleFactor) - clicked.x
      const deltaY = -clicked.y

      console.log(clicked.x, position.current.x)

      container
        .transition()
        .duration(300)
        .call(
          //@ts-ignore
          zoomHandler.transform,
          d3.zoomIdentity
            .translate(deltaX * scaleFactor, deltaY * scaleFactor)
            .scale(scaleFactor),
        )

      setAnimation(false)
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
  }

  useEffect(() => {
    const simulation = init()

    return () => {
      if (simulation) {
        simulation.stop()
      }
    }
  }, [nodes, relations])
}

export default useGraph
