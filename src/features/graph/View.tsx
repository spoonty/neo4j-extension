import React, {createElement, FC, useRef} from 'react'
import Filter from '@/assets/icons/FilterIcon'
import Settings from '@/assets/icons/SettingsIcon'
import {useGraphContext} from '@/features/graph/context'
import {useRender} from '@/features/graph/hooks/graphRender/useRender'
import SpeedDial from '@/ui/SpeedDial/SpeedDial'
import SvgMemorized from "@/features/graph/ui/SvgMemorized";

const View: FC = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    useRender(svgRef)

    const {dialog} = useGraphContext()

    const options = [
        {
            icon: Filter,
            action: () => {
            },
        },
        {
            icon: Settings,
            action: () => {
            },
        },
    ]

    return (
        <div>
            <SvgMemorized svgRef={svgRef}/>

            {dialog?.component && createElement(dialog.component, dialog.props)}

            <SpeedDial options={options}/>
        </div>
    )
}

export default View
