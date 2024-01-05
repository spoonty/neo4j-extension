import { useContext } from 'react'
import { ToastType } from '@/ui/Toast/constants'
import { IToastContext, ToastContextProvider } from '@/ui/Toast/context'

export const useToast = (): IToastContext => {
  const context = useContext(ToastContextProvider)

  const add = (type: ToastType, message: string) => {
    context.add(type, message)
  }

  return { add }
}
