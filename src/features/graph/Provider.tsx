import {FC} from 'react'
import {GraphContext} from '@/features/graph/context'
import {useInteraction} from '@/features/graph/hooks/useInteraction'
import View from '@/features/graph/View'
import {useSessionContext} from "@/features/session/context";
import {GraphFactory} from "@/domain/factories/Graph.factory";
import {ViewModel} from "@/features/graph/ViewModel";

const Provider: FC = () => {
    const {driver} = useSessionContext()
    const factory = new GraphFactory(driver)
    const viewModel = new ViewModel(factory)

    const value = useInteraction(viewModel)

    return (
        <GraphContext.Provider value={value}>
            <View/>
        </GraphContext.Provider>
    )
}

export default Provider
