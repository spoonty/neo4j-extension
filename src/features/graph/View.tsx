import { FC, useRef, useState } from 'react'
import CreateNodeDrawer from '@/features/create-node/View'
import CreateRelationDrawer from '@/features/create-relation/View'
import { useGraphContext } from '@/features/graph/context'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useGraphRender(svgRef)

  const { createRelationDialog, closeCreateRelationDialog } = useGraphContext()

  const [createNodeOpened, setCreateNodeOpened] = useState(false)

  const createNodeHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as HTMLElement

    switch (target.tagName.toLowerCase()) {
      case 'svg':
        setCreateNodeOpened(true)

        // after adding of template node, svg rerenders,
        // so we need to click again to start zoom animation
        setTimeout(() => {
          svgRef.current?.dispatchEvent(
            new MouseEvent('click', { bubbles: false }),
          )
        }, 0)
        break
    }
  }

  return (
    <div>
      <svg ref={svgRef} onClick={createNodeHandler} />

      <CreateNodeDrawer
        open={createNodeOpened}
        onClose={() => setCreateNodeOpened(false)}
      />
      <CreateRelationDrawer
        open={createRelationDialog}
        onClose={closeCreateRelationDialog}
      />
    </div>
  )
}

export default View
