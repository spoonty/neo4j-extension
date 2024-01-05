import { FC, PropsWithChildren } from 'react'
import { cn } from '@/utils/dom'

export interface ButtonProps
  extends PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'confirm' | 'cancel'
  disabled?: boolean
  className?: string
}

const classesByVariant = {
  default: 'text-light-blue border border-light-blue',
  confirm: 'bg-light-blue',
  cancel: 'bg-red-alert',
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  disabled = false,
  className,
  onClick,
  ...props
}) => {
  const handler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  return (
    <button
      className={cn(
        'h-[42px] rounded-lg px-5 py-2.5 font-semibold text-main-gray',
        classesByVariant[variant],
        disabled && 'cursor-default opacity-40',
        className,
      )}
      onClick={handler}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
