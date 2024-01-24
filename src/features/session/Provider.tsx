import {FC, PropsWithChildren} from "react";
import {useSession} from "@/features/session/hooks/useSession";
import {SessionContext} from "@/features/session/context";
import Connection from '@/features/session/View'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const value = useSession()

  return (
    <SessionContext.Provider value={value}>
      {
        value.isConnected
          ? children
          : <Connection />
      }
    </SessionContext.Provider>
  )
}

export default Provider