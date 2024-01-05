import { createContext } from 'react'
import { ToastType } from '@/ui/Toast/constants'

export interface IToastContext {
  add: (type: ToastType, message: string) => void
}

export const toastContext: IToastContext = {
  add: () => {},
}

export const ToastContextProvider = createContext<IToastContext>(toastContext)
