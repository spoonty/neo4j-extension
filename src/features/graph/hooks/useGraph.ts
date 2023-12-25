import * as d3 from 'd3'
import { RefObject, useEffect } from 'react'
import drag from '../helpers/drag'

export interface Node {
    id: number
    label: string
    x?: number
    y?: number
    fx?: number | null
    fy?: number | null
}
  
export interface Relation {
    source: number
    target: number
    type: string
}

export type NodeSimulation = d3.Simulation<Node, d3.SimulationLinkDatum<Node>>

const useGraph = (svg: RefObject<SVGSVGElement>, nodes: Node[], relations: Relation[]) => {
    const init = () => {
        const color = d3.scaleOrdinal(d3.schemeCategory10)

        const container = d3
            .select(svg.current)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth, window.innerHeight])
            .attr('style', 'max-width: 100%; height: auto;')

        container.selectAll('*').remove()

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            'link',
            d3
              .forceLink(relations)
              .id((d: any) => d.id)
              .distance(200),
          )
          .force('charge', d3.forceManyBody().strength(0))
        
        const relation = container
          .append('g')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .selectAll('line')
          .data(relations)
          .join('line')
          .attr('stroke-width', (d: any) => Math.sqrt(d.value))
        
        const node = container
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
        node.call(drag(simulation))
        
        simulation.on('tick', () => {
          relation
            .attr('x1', (d: any) => d.source.x)
            .attr('y1', (d: any) => d.source.y)
            .attr('x2', (d: any) => d.target.x)
            .attr('y2', (d: any) => d.target.y)
        
          node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
        })
        
        return simulation
    }

    useEffect(() => {
        const simulation = init()

        return () => {
            simulation.stop()
        }
    }, [nodes, relations])
}

export default useGraph