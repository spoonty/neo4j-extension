import { createElement, FC, useRef, useState } from 'react'
import Filter from '@/assets/icons/FilterIcon'
import Settings from '@/assets/icons/SettingsIcon'
import ConfigurationDrawer from '@/features/configuration-drawer/View'
import { useGraphContext } from '@/features/graph/context'
import { useRender } from '@/features/graph/hooks/useRender'
import SvgMemorized from '@/features/graph/ui/SvgMemorized'
import SpeedDial from '@/ui/SpeedDial/SpeedDial'

const View: FC = () => {
  const [settingsOpened, setSettingsOpened] = useState(false)

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
      action: () => setSettingsOpened(true),
    },
  ]

  return (
    <div>
      <SvgMemorized svgRef={svgRef} />

      {dialog?.component && createElement(dialog.component, dialog.props)}

      <SpeedDial options={options} />

      {settingsOpened && (
        <ConfigurationDrawer onClose={() => setSettingsOpened(false)} />
      )}
    </div>
  )
}

export default View
