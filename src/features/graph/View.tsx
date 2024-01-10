import {createElement, FC, useRef} from 'react'
import { useGraphContext } from '@/features/graph/context'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useGraphRender(svgRef)

  const { dialog } = useGraphContext()

  return (
    <div>
      <svg ref={svgRef} />

      {
        dialog?.component && createElement(dialog.component, dialog.props)
      }
    </div>
  )
}

export default View
