import {createElement, FC, useRef} from 'react'
import { useGraphContext } from '@/features/graph/context'
import { useGraphRender } from '@/features/graph/hooks/useGraphRender'
import SpeedDial from "@/ui/SpeedDial/SpeedDial";
import PlusIcon from "@/assets/icons/PlusIcon";

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useGraphRender(svgRef)

  const { dialog } = useGraphContext()

  const options = [
    {
      icon: PlusIcon,
      action: () => {}
    }
  ]

  return (
    <div>
      <svg ref={svgRef} />

      {
        dialog?.component && createElement(dialog.component, dialog.props)
      }

      <SpeedDial options={options} />
    </div>
  )
}

export default View
