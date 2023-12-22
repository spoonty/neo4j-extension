import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Props {
  nodes: any
  links: any
}

const Graph: FC<Props> = ({ nodes, links }) => {
  const svgRef = useRef()

  useEffect(() => {
    const width = 600
    const height = 400

    const svg = d3
      // @ts-ignore
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', 1)

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2')

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
    })

    return () => {
      // Очистка ресурсов, если компонент размонтируется
      simulation.stop()
    }
  }, [nodes, links])

  // @ts-ignore
  return <svg ref={svgRef} />
}

export default Graph
