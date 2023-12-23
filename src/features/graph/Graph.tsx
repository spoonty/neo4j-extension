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

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto;')

    svg.selectAll('*').remove()

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(200),
      )
      .force('charge', d3.forceManyBody().strength(0))

    // .force('charge', d3.forceManyBody().strength(-200))
    // .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 20)
      .attr('fill', (d: any) => color(d.group))

    node.append('title').text((d) => d.id)

    // @ts-ignore
    node.call(
      // @ts-ignore
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended),
    )

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
    })

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      // if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [nodes, links])

  return <svg ref={svgRef} className="border-2 border-black"></svg>
}

export default Graph
