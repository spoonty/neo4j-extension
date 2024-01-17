import { NodeD3 } from '@/domain/neo4j/models/Node'
import {NodeSimulation, Simulation} from '@/features/graph/hooks/useGraphRender'
import * as d3 from 'd3'

export const drag = (
  simulation: Simulation,
): d3.DragBehavior<Element, unknown, unknown> => {
  const dragstarted = (
    event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>,
  ) => {
    if (!event.active) simulation.simulation.alphaTarget(0.3).restart()

    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  const dragged = (event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>) => {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  const dragended = (event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>) => {
    event.subject.fx = null
    event.subject.fy = null
  }

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}
