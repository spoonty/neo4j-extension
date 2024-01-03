import { FC, PropsWithChildren } from 'react'
import { cn } from '@/utils/dom'

interface Props extends PropsWithChildren {
  type?: 'default' | 'cancel'
  disabled?: boolean
  className?: string
}

const classesByType = {
  default: 'bg-light-blue',
  cancel: 'bg-red-alert',
}

const Button: FC<Props> = ({
  children,
  type = 'default',
  disabled = false,
  className,
}) => (
  <button
    className={cn(
      'text-main-gray rounded-lg px-5 py-2.5 font-semibold',
      classesByType[type],
    )}
  >
    {children}
  </button>
)

export default Button
