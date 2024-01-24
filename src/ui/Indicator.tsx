import {FC} from "react";
import {cn} from "@/utils/dom";
import Tooltip from "@/ui/Tooltip";

interface Props {
  variant?: 'full' | 'partial' | 'none'
  className?: string
}

const classesByVariant = {
  full: 'bg-green-500',
  partial: 'bg-yellow-300',
  none: 'bg-red-500',
}

const Indicator: FC<Props> = ({ variant = 'full', className }) => (
  <span className={cn("relative flex h-3 w-3", className)}>
  <Tooltip.TooltipProvider delayDuration={0}>
    <Tooltip.Tooltip>
      <Tooltip.Trigger>
        <div className='flex'>
          {
            variant !== 'none' && <span
                  className={cn('flex absolute inline-flex h-full w-full rounded-full animate-ping', classesByVariant[variant])}/>
          }
          <span className={cn("relative inline-flex rounded-full h-3 w-3", classesByVariant[variant])}></span>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content side='right'>
        {variant}
      </Tooltip.Content>
    </Tooltip.Tooltip>
  </Tooltip.TooltipProvider>
    </span>
)

export default Indicator