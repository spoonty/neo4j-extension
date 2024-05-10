import { useLayoutEffect, useState } from 'react'
import { DriverImpl } from '@/data/services/Driver.impl'
import { storageImpl } from '@/data/services/Storage.impl'
import { SessionRepositoryImpl } from '@/domain/repositories/SessionRepository.impl'
import { ConnectCaseImpl } from '@/domain/usecases/session/ConnectCase'
import { DisconnectCaseImpl } from '@/domain/usecases/session/DisconnectCase'
import { DEFAULT_CONFIGURATION } from '@/features/configuration/static/static'
import { ISessionContext } from '@/features/session/context'
import { Connection } from '@/features/session/static/const'
import { localStorageKeys } from '@/features/session/static/keys'
import { useToast } from '@/ui/Toast/hooks/useToast'

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

  const disconnect = async () => {
    try {
      const disconnectCase = new DisconnectCaseImpl(
        sessionRepository.disconnect,
        storageImpl,
      )

      await disconnectCase.execute()
      setConnection(Connection.NONE)
    } catch (e: any) {
      add('error', 'Impossible to disconnect connection')
    }
  }

  const init = async () => {
    setLoading(true)

    if (!storageImpl.get(localStorageKeys.configuration)) {
      storageImpl.set(localStorageKeys.configuration, DEFAULT_CONFIGURATION)
    }

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
    disconnect,
  }
}
