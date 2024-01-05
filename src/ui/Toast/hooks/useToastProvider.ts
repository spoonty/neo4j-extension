import { useState } from 'react'
import { Toast, ToastType } from '@/ui/Toast/constants'

export const useToastProvider = () => {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<Toast>({
    message: '',
    type: 'success',
    duration: 3000,
  })

  const add = (type: ToastType, message: string) => {
    setToast({
      type,
      message,
      duration: message.length > 15 ? 5000 : 3000,
    })

    setOpen(true)
  }

  return { open, setOpen, toast, add }
}
