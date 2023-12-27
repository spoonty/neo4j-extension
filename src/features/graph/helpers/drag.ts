import * as d3 from 'd3'
import { NodeD3, NodeSimulation } from '../hooks/useGraph'

const drag = (simulation: NodeSimulation): d3.DragBehavior<Element, unknown, unknown> => {
    const dragstarted = (event: d3.D3DragEvent<SVGSVGElement, NodeD3, NodeD3>) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()

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

export default drag