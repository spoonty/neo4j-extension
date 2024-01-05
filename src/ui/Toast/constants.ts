import { FunctionComponent, SVGProps } from 'react'
import Error from '@/assets/icons/ErrorIcon'
import Success from '@/assets/icons/SuccessIcon'
import Warning from '@/assets/icons/WarningIcon'

export type ToastType = 'success' | 'warning' | 'error'

export interface Toast {
  type: ToastType
  message: string
  duration: 3000 | 5000
}

type StyleByType = {
  [key in ToastType]: string
}

type TypeIcon = {
  [key in ToastType]: FunctionComponent<SVGProps<SVGSVGElement>>
}

export const styleByType: StyleByType = {
  success: 'bg-green-800 text-green-200',
  warning: 'bg-red-800 text-red-200',
  error: 'bg-orange-700 text-orange-200',
}

export const typeIcon: TypeIcon = {
  success: Success,
  warning: Warning,
  error: Error,
}
