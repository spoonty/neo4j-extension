import {ISessionContext} from "@/features/session/context";
import {DriverImpl} from "@/data/driver/Driver.impl";
import {useState} from "react";
import {useToast} from "@/ui/Toast/hooks/useToast";

export const useSession = (): ISessionContext => {
  const { add } = useToast()

  const [driver] = useState(new DriverImpl())

  const [isConnected, setIsConnected] = useState(driver.isConnected())

  const connect = async (url: string, username: string, password: string) => {
    try {
      await driver.connect(url, username, password)
      setIsConnected(driver.isConnected())
    } catch (e: any) {
      add('error', e.message)
    }
  }

  return {
    driver,
    isConnected,
    connect
  }
}