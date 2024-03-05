import { FC } from 'react'
import Tooltip from '@/ui/Tooltip'
import { cn } from '@/utils/dom'

interface Props {
  variant?: 'full' | 'partial' | 'none'
  className?: string
}

const classesByVariant = {
  full: 'bg-green-500',
  partial: 'bg-yellow-300',
  none: 'bg-red-500',
}

const textByVariant = {
  full: 'Connection with full rights',
  partial: 'Connection with read-only rights',
  none: 'Not connected',
}

const Indicator: FC<Props> = ({ variant = 'full', className }) => (
  <span className={cn('relative flex h-3 w-3', className)}>
    <Tooltip.TooltipProvider delayDuration={0}>
      <Tooltip.Tooltip>
        <Tooltip.Trigger>
          <div className="flex">
            {variant !== 'none' && (
              <span
                className={cn(
                  'absolute flex inline-flex h-full w-full animate-ping rounded-full',
                  classesByVariant[variant],
                )}
              />
            )}
            <span
              className={cn(
                'relative inline-flex h-3 w-3 rounded-full',
                classesByVariant[variant],
              )}
            ></span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">{textByVariant[variant]}</Tooltip.Content>
      </Tooltip.Tooltip>
    </Tooltip.TooltipProvider>
  </span>
)

export default Indicator
