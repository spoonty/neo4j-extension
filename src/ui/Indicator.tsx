import { FC } from 'react'
import { Connection } from '@/features/session/static/const'
import Tooltip from '@/ui/Tooltip'
import { cn } from '@/utils/dom'

interface Props {
  variant?: Connection
  className?: string
}

const classesByVariant = {
  [Connection.FULL]: 'bg-green-500',
  [Connection.READ_ONLY]: 'bg-yellow-300',
  [Connection.NONE]: 'bg-red-500',
  [Connection.UNCOTROLLABLE]: 'bg-blue-500',
}

const textByVariant = {
  [Connection.FULL]: 'Connection with full rights',
  [Connection.READ_ONLY]: 'Connection with read-only rights',
  [Connection.NONE]: 'Not connected',
  [Connection.UNCOTROLLABLE]: 'Connection without checking rights',
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
