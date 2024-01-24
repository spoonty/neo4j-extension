import {createContext, useContext} from "react";
import {Driver} from "@/data/driver/Driver.interface";
import {DriverImpl} from "@/data/driver/Driver.impl";

export interface ISessionContext {
  driver: Driver
  isConnected: boolean
  connect: (url: string, username: string, password: string) => void
}

export const SessionContext = createContext<ISessionContext>({
  driver: new DriverImpl(),
  isConnected: false,
  connect: () => {}
})

export const useSessionContext = () => useContext(SessionContext)