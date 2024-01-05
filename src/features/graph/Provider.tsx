import { FC } from 'react'
import { GraphContext } from '@/features/graph/context'
import { useGraph } from '@/features/graph/hooks/useGraph'
import View from '@/features/graph/View'

const Provider: FC = () => {
  const value = useGraph()

  return (
    <GraphContext.Provider value={value}>
      <View />
    </GraphContext.Provider>
  )
}

export default Provider
