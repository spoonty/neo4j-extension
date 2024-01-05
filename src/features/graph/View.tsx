import { FC, useRef, useState } from 'react'
import AddNodeDrawer from '@/features/add-node/AddNodeDrawer'
import { useGraphContext } from '@/features/graph/context'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  const [addNode, setAddNode] = useState(false)

  useGraphRender(svgRef)

  const handler = () => {
    setAddNode(true)

    setTimeout(() => {
      svgRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: false }))
    }, 0)
  }

  return (
    <div>
      <svg ref={svgRef} onClick={handler} />
      <AddNodeDrawer open={addNode} onClose={() => setAddNode(false)} />
    </div>
  )
}

export default View
