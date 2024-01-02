import { FC } from 'react'
import { cn } from '@/utils/dom'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({
  className,
  placeholder,
  type = 'text',
  ...props
}) => {
  return (
    <input
      type={type}
      className={cn(
        'h-9 border-b-2 outline-none focus:border-pink-500',
        className,
      )}
      placeholder={placeholder}
    />
  )
}

export default Input
