import {ISessionContext} from "@/features/session/context";
import {DriverImpl} from "@/data/driver/Driver.impl";
import {useEffect, useState} from "react";
import {useToast} from "@/ui/Toast/hooks/useToast";
import {StorageImpl} from "@/data/storage/Storage.impl";
import {SessionRepositoryImpl} from "@/data/session/SessionRepository.impl";
import {ConnectCaseImpl} from "@/domain/session/usecases/ConnectCase";

const storage = new StorageImpl()

export const useSession = (): ISessionContext => {
  const { add } = useToast()

  const [driver] = useState(new DriverImpl())

  const [isConnected, setIsConnected] = useState(driver.isConnected())

  const sessionRepository = new SessionRepositoryImpl(driver)
  const connectCase = new ConnectCaseImpl(sessionRepository.connect, storage)

  const connect = async (url: string, username: string, password: string, displayError = false) => {
    try {
      await connectCase.execute(url, username, password)
      setIsConnected(driver.isConnected())
    } catch (e: any) {
      if (displayError) {
        add('error', e.message)
      }
    }
  }

  useEffect(() => {
    const { url, username, password } = storage.get('connection')

    if (url && username && password) {
      connect(url, username, password, true)
    }
  }, []);

  return {
    driver,
    isConnected,
    connect
  }
}