import { FC } from 'react'
import Button, { ButtonProps } from '@/ui/Button/Button'
import { cn } from '@/utils/dom'

const IconButton: FC<ButtonProps> = ({ children, className, ...props }) => (
  <Button
    className={cn(
      className,
      'flex h-7 w-7 items-center justify-center rounded-full px-2.5 py-2.5',
    )}
    {...props}
  >
    {children}
  </Button>
)

export default IconButton
