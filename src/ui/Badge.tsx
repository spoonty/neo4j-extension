import { FC, PropsWithChildren } from 'react'
import Close from '@/assets/icons/CloseIcon'
import { cn } from '@/utils/dom'

interface Props extends PropsWithChildren {
  onRemove?: () => void
  className?: string
}

const Badge: FC<Props> = ({ children, onRemove, className }) => (
  <span
    className={cn(
      'flex cursor-default items-center justify-between gap-2 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium leading-3 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      className,
    )}
  >
    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
      {children}
    </span>
    {onRemove && (
      <Close
        width="12"
        height="12"
        className="cursor-pointer"
        onClick={onRemove}
      />
    )}
  </span>
)

export default Badge
