import { FC } from 'react'
import { cn } from '@/utils/dom'
import * as PopoverPrimitive from '@radix-ui/react-popover'

interface Props extends PopoverPrimitive.PopoverProps {
  items: string[]
  width?: string
  className?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactElement
}

const Popover: FC<Props> = ({
  children,
  open,
  items,
  className,
  value,
  onValueChange,
}) => {
  return (
    <PopoverPrimitive.Root open={open} modal={false}>
      <PopoverPrimitive.Trigger className="w-full">
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            'relative z-[1000] mt-[1px] min-w-[414px] rounded-b-md bg-light-dark',
            className,
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="scroll-none max-h-[200px] overflow-y-scroll">
            {items.map((item) => (
              <div
                onClick={() => onValueChange?.(item)}
                className={cn(
                  'flex h-9 w-full cursor-pointer items-center justify-center bg-black bg-opacity-5 text-main-gray hover:bg-opacity-10',
                  item === value && 'bg-opacity-20',
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export default Popover
