import { Driver } from '@/data/interfaces/services/Driver.interface'
import { DriverImpl } from '@/data/services/Driver.impl'
import { Connection } from '@/features/session/static/const'
import { createContext, useContext } from 'react'

export interface ISessionContext {
  driver: Driver
  connection: Connection
  connect: (url: string, username: string, password: string) => void
}

export const SessionContext = createContext<ISessionContext>({
  driver: new DriverImpl(),
  connection: Connection.NONE,
  connect: () => {},
})

export const useSessionContext = () => useContext(SessionContext)
