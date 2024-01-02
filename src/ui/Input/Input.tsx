import { FC } from 'react'
import { cn } from '@/utils/dom'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void
}

const Input: FC<InputProps> = ({
  className,
  placeholder,
  type = 'text',
  value,
  onValueChange,
  ...props
}) => {
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value)
  }

  return (
    <input
      type={type}
      className={cn(
        'h-9 border-b-2 outline-none focus:border-pink-500',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={handler}
      {...props}
    />
  )
}

export default Input
