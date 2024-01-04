import { FC, useRef, useState } from 'react'
import AddNodeDrawer from '@/features/add-node/AddNodeDrawer'
import useGraph from '@/features/graph/hooks/useGraph'
import { useInteraction } from '@/features/graph/hooks/useInteraction'

const Graph: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  const [addNode, setAddNode] = useState(false)

  const {
    nodes,
    relations,
    createNode,
    clickHandler,
    createNodeTemplate,
    removeNodeTemplate,
  } = useInteraction()

  useGraph(svgRef, nodes, relations, clickHandler)

  const handler = () => {
    setAddNode(true)

    setTimeout(() => {
      svgRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: false }))
    }, 0)
  }

  return (
    <div>
      <svg ref={svgRef} onClick={handler} />
      <AddNodeDrawer
        open={addNode}
        removeNodeTemplate={removeNodeTemplate}
        createNodeTemplate={createNodeTemplate}
        createNode={createNode}
        onClose={() => setAddNode(false)}
      />
    </div>
  )
}

export default Graph
