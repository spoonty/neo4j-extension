import { createElement, FC, useRef, useState } from 'react'
import Filter from '@/assets/icons/FilterIcon'
import Off from '@/assets/icons/OffIcon'
import Settings from '@/assets/icons/SettingsIcon'
import ConfigurationDrawer from '@/features/configuration-drawer/View'
import { useGraphContext } from '@/features/graph/context'
import { useRender } from '@/features/graph/hooks/useRender'
import SvgMemorized from '@/features/graph/ui/SvgMemorized'
import { useSessionContext } from '@/features/session/context'
import SpeedDial from '@/ui/SpeedDial/SpeedDial'

const View: FC = () => {
  const [settingsOpened, setSettingsOpened] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)
  useRender(svgRef)

  const { disconnect } = useSessionContext()
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
    {
      icon: Off,
      action: () => {
        disconnect()
      },
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
