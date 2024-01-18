import { createElement, FC, useRef } from 'react'
import Filter from '@/assets/icons/FilterIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import Settings from '@/assets/icons/SettingsIcon'
import { useGraphContext } from '@/features/graph/context'
import { useRender } from '@/features/graph/hooks/graphRender/useRender'
import SpeedDial from '@/ui/SpeedDial/SpeedDial'

const View: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  useRender(svgRef)

  const { dialog } = useGraphContext()

  const options = [
    {
      icon: Filter,
      action: () => {},
    },
    {
      icon: Settings,
      action: () => {},
    },
  ]

  return (
    <div>
      <svg ref={svgRef} />

      {dialog?.component && createElement(dialog.component, dialog.props)}

      <SpeedDial options={options} />
    </div>
  )
}

export default View
