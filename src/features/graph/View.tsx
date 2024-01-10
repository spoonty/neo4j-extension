import {createElement, FC, useRef} from 'react'
import { useGraphContext } from '@/features/graph/context'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useGraphRender(svgRef)

  const { dialog } = useGraphContext()

  const createNodeHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.target as HTMLElement

    switch (target.tagName.toLowerCase()) {
      case 'svg':
        // after adding of template node, svg rerenders,
        // so we need to click again to start zoom animation
        setTimeout(() => {
          svgRef.current?.dispatchEvent(
            new MouseEvent('click', { bubbles: false }),
          )
        }, 100)
        break
    }
  }

  return (
    <div>
      <svg ref={svgRef} onClick={createNodeHandler} />

      {
        dialog?.component && createElement(dialog.component, dialog.props)
      }
    </div>
  )
}

export default View
