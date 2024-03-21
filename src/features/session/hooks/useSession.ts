import { DriverImpl } from '@/data/services/Driver.impl'
import { storageImpl } from '@/data/services/Storage.impl'
import { SessionRepositoryImpl } from '@/domain/repositories/SessionRepository.impl'
import { ConnectCaseImpl } from '@/domain/usecases/session/ConnectCase'
import { ISessionContext } from '@/features/session/context'
import { localStorageKeys } from '@/features/session/static/keys'
import { useToast } from '@/ui/Toast/hooks/useToast'
import { useLayoutEffect, useState } from 'react'

export const useSession = (): ISessionContext => {
  const { add } = useToast()

  const [loading, setLoading] = useState(true)
  const [driver] = useState(new DriverImpl())

  const [connection, setConnection] = useState(driver.getConnection())

  const sessionRepository = new SessionRepositoryImpl(driver)

  const connect = async (
    url: string,
    username: string,
    password: string,
    displayError = true,
  ) => {
    try {
      const connectCase = new ConnectCaseImpl(
        sessionRepository.connect,
        storageImpl,
      )

      await connectCase.execute(url, username, password)
      setConnection(driver.getConnection())
    } catch (e: any) {
      if (displayError) {
        add('error', e.message)
      }
    }
  }

  const init = async () => {
    setLoading(true)
  
    const { url, username, password } = storageImpl.get(
      localStorageKeys.connection,
    )
  
    if (url && username && password) {
      await connect(url, username, password, false)
    }
  
    setLoading(false)
  }

  useLayoutEffect(() => {
    init()
  }, [])

  return {
    driver,
    connection,
    loading,
    connect,
  }
}
