import { FC, PropsWithChildren } from 'react'
import { cn } from '@/utils/dom'

interface Props
  extends PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'confirm' | 'cancel'
  disabled?: boolean
  className?: string
}

const classesByVariant = {
  default: 'bg-light-gray text-main-dark',
  confirm: 'bg-light-blue',
  cancel: 'bg-red-alert',
}

const Button: FC<Props> = ({
  children,
  variant = 'default',
  disabled = false,
  className,
  ...props
}) => (
  <button
    className={cn(
      'text-main-gray rounded-lg px-5 py-2.5 font-semibold',
      classesByVariant[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
)

export default Button
