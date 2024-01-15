import { createElement, FC, FunctionComponent, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import IconButton from '@/ui/Button/IconButton'
import { cn } from '@/utils/dom'

type Option = {
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
  action: () => void
}

interface Props {
  options: Option[]
  className?: string
}

const SpeedDial: FC<Props> = ({ options, className }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className={cn(
        'background-red-950 group fixed bottom-6 start-6',
        className,
      )}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col gap-2">
        {hover &&
          options.map((option) => {
            return (
              <IconButton className="mt-2 h-[56px] w-[56px]">
                {createElement(option.icon, { width: '28', height: '28' })}
              </IconButton>
            )
          })}
        <IconButton variant="confirm" className="mt-2 h-[56px] w-[56px]">
          <PlusIcon width="28" height="28" />
        </IconButton>
      </div>
    </div>
  )
}

export default SpeedDial
