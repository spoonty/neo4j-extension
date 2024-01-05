import { FC, PropsWithChildren } from 'react'
import { ToastContextProvider } from '@/ui/Toast/context'
import { useToastProvider } from '@/ui/Toast/hooks/useToastProvider'
import Toast from '@/ui/Toast/Toast'
import * as ToastPrimitive from '@radix-ui/react-toast'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const { open, setOpen, toast, add } = useToastProvider()

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastContextProvider.Provider value={{ add }}>
        {children}
        <Toast open={open} onOpenChange={setOpen} toast={toast} />
        <ToastPrimitive.Viewport className="fixed bottom-[26px] right-[26px] z-50 flex w-[320px] flex-col-reverse items-end gap-y-4 outline-none" />
      </ToastContextProvider.Provider>
    </ToastPrimitive.Provider>
  )
}

export default Provider
