import { FC, useRef } from 'react'
import useGraph, { Node, Relation } from './hooks/useGraph'

interface Props {
  nodes: Node[]
  relations: Relation[]
}

const Graph: FC<Props> = ({ nodes, relations }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useGraph(svgRef, nodes, relations)

  return <svg ref={svgRef} className="border-2 border-black"></svg>
}

export default Graph
