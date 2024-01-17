import { NodeD3 } from '@/domain/neo4j/models/Node'
import { Node } from '@/features/graph/hooks/graphRender/classes/Node'
import { Simulation } from '@/features/graph/hooks/graphRender/classes/Simulation'
import * as d3 from 'd3'

export const drag = (
  nodes: Node,
  simulation: Simulation,
): d3.DragBehavior<Element, unknown, unknown> => {
  const dragstarted = (
    event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>,
  ) => {
    if (!event.active) simulation.get.alphaTarget(0.3).restart()

    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  const dragged = (event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>) => {
    event.subject.fx = event.x
    event.subject.fy = event.y

    nodes.get.each(function (d: any) {
      if (event.subject !== d) {
        d.fx = d.x
        d.fy = d.y
      }
    })
  }

  const dragended = (event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>) => {
    if (!event.active) simulation.get.alphaTarget(0)

    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  return d3
    .drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)
}
