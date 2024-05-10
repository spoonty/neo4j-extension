import { createElement, FC, useRef, useState } from 'react'
import Filter from '@/assets/icons/FilterIcon'
import Nodes from '@/assets/icons/NodesIcon'
import Off from '@/assets/icons/OffIcon'
import Settings from '@/assets/icons/SettingsIcon'
import ConfigurationDrawer from '@/features/configuration/View'
import { Mode } from '@/features/graph/constants'
import { useGraphContext } from '@/features/graph/context'
import { useRender } from '@/features/graph/hooks/useRender'
import Pagination from '@/features/graph/ui/Pagination'
import SvgMemorized from '@/features/graph/ui/SvgMemorized'
import { useSessionContext } from '@/features/session/context'
import SpeedDial from '@/ui/SpeedDial/SpeedDial'

const View: FC = () => {
  const [settingsOpened, setSettingsOpened] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)
  useRender(svgRef)

  const { disconnect } = useSessionContext()
  const { dialog, mode, setMode } = useGraphContext()

  const options = [
    mode === Mode.FULL_GRAPH
      ? {
          icon: Filter,
          action: () => setMode(Mode.FILTERED_GRAPH),
        }
      : {
          icon: Nodes,
          action: () => setMode(Mode.FULL_GRAPH),
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
      {mode === Mode.FILTERED_GRAPH && <Pagination />}

      {settingsOpened && (
        <ConfigurationDrawer onClose={() => setSettingsOpened(false)} />
      )}
    </div>
  )
}

export default View
