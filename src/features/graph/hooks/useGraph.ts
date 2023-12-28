import * as d3 from 'd3'
import { RefObject, useEffect } from 'react'
import { Node } from '@/domain/neo4j/models/Node'
import { Relation } from '@/domain/neo4j/models/Relation'
import drag from '@/features/graph/helpers/drag'

export class NodeD3 extends Node {
  constructor(node: Node, public x?: number, public y?: number, public fx?: number | null, public fy?: number | null) {
    super(node.elementId, node.identity, node.labels, node.properties)
  }
}
  
export class RelationD3 extends Relation {
  source: string
  target: string

  constructor(relation: Relation) {
    super(relation.elementId, relation.end, relation.endNodeElementId, relation.start, relation.startNodeElementId, relation.properties, relation.type)
    
    this.source = relation.startNodeElementId
    this.target = relation.endNodeElementId
  }
}

export type NodeSimulation = d3.Simulation<NodeD3, d3.SimulationLinkDatum<NodeD3>>

const useGraph = (svg: RefObject<SVGSVGElement>, nodes: NodeD3[] | null, relations: RelationD3[] | null) => {
    const init = () => {
        if (!nodes || !relations) {
          return
        }

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
              .id((d: any) => d.elementId)
              .distance(300),
          )
          .force('charge', d3.forceManyBody().strength(0))

        const arrowMarker = container
          .append('defs')
          .append('marker')
          .attr('id', 'arrow')
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 50)
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('orient', 'auto');
      
        arrowMarker
          .append('path')
          .attr('d', 'M0,-5L10,0L0,5')
          .attr('class', 'arrow-head')
        
          const relation = container
          .append('g')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .selectAll('g')
          .data(relations)
          .join('g');
  
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
        
        const node = container
          .append('g')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .selectAll('g')
          .data(nodes)
          .join('g')
        
        node.append('circle')
          .attr('r', 40)
          .attr('fill', (d: any) => color(d.group))
        
        node.append('text')
          .text((d: any) => d.properties[Object.keys(d.properties)[0]])
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .style('user-select', 'none')

        
        // @ts-ignore
        node.call(drag(simulation))
        
        simulation.on('tick', () => {
          relation.select('line')
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);
      
        relation.select('text')
          .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
          .attr('y', (d: any) => (d.source.y + d.target.y) / 2);
        
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