import { FC, PropsWithChildren } from 'react'
import { SessionContext } from '@/features/session/context'
import { useSession } from '@/features/session/hooks/useSession'
import { Connection as ConnectionType } from '@/features/session/static/const'
import Connection from '@/features/session/View'
import Indicator from '@/ui/Indicator'
import Loader from '@/ui/Loader'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const value = useSession()

  return (
    <SessionContext.Provider value={value}>
      <Indicator className="fixed start-6 top-6" variant={value.connection} />

      {value.loading ? (
        <Loader className="absolute left-[50%] top-[50%]" />
      ) : value.connection !== ConnectionType.NONE ? (
        children
      ) : (
        <Connection />
      )}
    </SessionContext.Provider>
  )
}

export default Provider
