import { createElement, FC, useRef, useState } from 'react'
import Filter from '@/assets/icons/FilterIcon'
import Image from '@/assets/icons/ImageIcon'
import Nodes from '@/assets/icons/NodesIcon'
import Off from '@/assets/icons/OffIcon'
import Settings from '@/assets/icons/SettingsIcon'
import ConfigurationDrawer from '@/features/configuration/View'
import Filtration from '@/features/filtration/View'
import { InteractionState, Mode } from '@/features/graph/constants'
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
  const { dialog, mode, setMode, state } = useGraphContext()

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
      icon: Image,
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
      className: 'border-red-alert',
    },
  ]

  return (
    <div>
      <SvgMemorized svgRef={svgRef} />

      {dialog?.component && createElement(dialog.component, dialog.props)}

      {!settingsOpened && state.current === InteractionState.DEFAULT && (
        <SpeedDial options={options} />
      )}
      {!settingsOpened &&
        mode === Mode.FILTERED_GRAPH &&
        state.current === InteractionState.DEFAULT && <Filtration />}

      {settingsOpened && (
        <ConfigurationDrawer onClose={() => setSettingsOpened(false)} />
      )}
    </div>
  )
}

export default View
