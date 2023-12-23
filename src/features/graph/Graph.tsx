import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Node {
  id: number
  label: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: number
  target: number
  type: string
}

interface Props {
  nodes: Node[]
  links: Link[]
}

const Graph: FC<Props> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const width = 1550
    const height = 700

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(400),
      )
      // .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append('g')
      .selectAll<SVGLineElement, Link>('line')
      .data(links, (d) => `${d.source}-${d.target}`)
      .enter()
      .append('line')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      
    const node = svg
      .append('g')
      .selectAll<SVGCircleElement, Node>('circle')
      .data(nodes, (d) => `${d.id}`)
      .enter()
      .append('circle')
      .attr('r', 40)
      .attr('fill', 'red') // Устанавливаем красный цвет для заливки вершины
      .attr('stroke', 'black') // Устанавливаем черный цвет для границы вершины
      .attr('stroke-width', 2)
      //@ts-ignore
      .call(
        //@ts-ignore
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )

    const label = svg
      .append('g')
      .selectAll<SVGTextElement, Node>('text')
      .data(nodes, (d) => `${d.id}`)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('dy', 4)
      .attr('text-anchor', 'middle')

    const linkLabel = svg
      .append('g')
      .selectAll<SVGTextElement, Link>('text')
      .data(links, (d) => `${d.source}-${d.target}`)
      .enter()
      .append('text')
      .text((d) => d.type)
      .attr('dy', -5)
      .attr('text-anchor', 'middle')

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('cx', (d) => d.x || 0).attr('cy', (d) => d.y || 0)

      label.attr('x', (d) => d.x || 0).attr('y', (d) => d.y || 0)

      linkLabel
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2 || 0)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2 || 0)
    })

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      if (event.subject) {
        const d = event.subject as Node
        d.fx = d.x
        d.fy = d.y
      }
    }

    function dragged(event: any) {
      if (event.subject) {
        const d = event.subject as Node
        d.fx = event.x
        d.fy = event.y
      }
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      if (event.subject) {
        const d = event.subject as Node
        d.fx = null
        d.fy = null
      }
    }

    return () => {
      simulation.stop()
    }
  }, [])

  return <svg ref={svgRef} className="border-2 border-black"></svg>
}

export default Graph
