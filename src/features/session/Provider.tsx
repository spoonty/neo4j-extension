import { FC, PropsWithChildren } from 'react'
import { SessionContext } from '@/features/session/context'
import { useSession } from '@/features/session/hooks/useSession'
import Connection from '@/features/session/View'
import { Connection as ConnectionType } from '@/features/session/static/const'
import Indicator from '@/ui/Indicator'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const value = useSession()

  return (
    <SessionContext.Provider value={value}>
      <Indicator
        className="fixed start-6 top-6"
        variant={value.connection}
      />

      {value.connection !== ConnectionType.NONE ? children : <Connection />}
    </SessionContext.Provider>
  )
}

export default Provider
