import { FC } from 'react'
import { GraphContext } from '@/features/graph/context'
import { useInteraction } from '@/features/graph/hooks/useInteraction'
import View from '@/features/graph/View'

const Provider: FC = () => {
  const value = useInteraction()

  return (
    <GraphContext.Provider value={value}>
      <View />
    </GraphContext.Provider>
  )
}

export default Provider
