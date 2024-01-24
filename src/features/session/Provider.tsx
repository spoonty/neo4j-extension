import {FC, PropsWithChildren} from "react";
import {useSession} from "@/features/session/hooks/useSession";
import {SessionContext} from "@/features/session/context";
import Connection from '@/features/session/View'
import Indicator from "@/ui/Indicator";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const value = useSession()

  return (
    <SessionContext.Provider value={value}>
      <Indicator className='fixed top-6 start-6' variant={value.isConnected ? 'full' : 'none'} />

      {
        value.isConnected
          ? children
          : <Connection />
      }
    </SessionContext.Provider>
  )
}

export default Provider