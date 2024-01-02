import { FC, HTMLAttributes } from 'react'
import { cn } from '@/utils/dom'
import * as ScrollPrimitive from '@radix-ui/react-scroll-area'

interface Props
  extends ScrollPrimitive.ScrollAreaScrollbarProps,
    HTMLAttributes<HTMLDivElement> {
  scrollClassName?: string
}

const Scrollbar: FC<Props> = ({
  scrollClassName,
  orientation = 'vertical',
  className,
  ...props
}) => (
  <ScrollPrimitive.Scrollbar
    orientation={orientation}
    className={cn(
      'relative flex w-2 justify-center bg-transparent before:absolute before:left-0 before:block before:h-full before:w-2 before:rounded-[20px] before:content-[""]',
      className,
    )}
  >
    <ScrollPrimitive.Thumb
      className={cn(
        'w-2 rounded-[20px] bg-black p-0.5 opacity-40',
        scrollClassName,
      )}
    />
  </ScrollPrimitive.Scrollbar>
)

const ScrollArea = {
  Root: ScrollPrimitive.Root,
  Viewport: ScrollPrimitive.Viewport,
  Scrollbar,
}

export default ScrollArea
