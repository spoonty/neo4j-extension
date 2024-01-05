import { FC, useRef, useState } from 'react'
import CreateNodeDrawer from '@/features/create-node/View'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useGraphRender(svgRef)

  const [createNodeOpened, setCreateNodeOpened] = useState(false)

  const createNodeHandler = () => {
    setCreateNodeOpened(true)

    // after adding of template node, svg rerenders,
    // so we need to click again to start zoom animation
    setTimeout(() => {
      svgRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: false }))
    }, 0)
  }

  return (
    <div>
      <svg ref={svgRef} onClick={createNodeHandler} />

      <CreateNodeDrawer
        open={createNodeOpened}
        onClose={() => setCreateNodeOpened(false)}
      />
    </div>
  )
}

export default View
