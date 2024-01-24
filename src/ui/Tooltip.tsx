import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {FC} from "react";
import {cn} from "@/utils/dom";
import Caret from "@/assets/icons/CaretIcon";

const TooltipProvider: FC<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>> = ({children, ...props}) => (
  <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
)

const Tooltip = TooltipPrimitive.Root

const Trigger = TooltipPrimitive.Trigger

const Arrow = TooltipPrimitive.Arrow

const Portal = TooltipPrimitive.Portal

const Content: FC<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>> = ({children, ...props}) => (
  <Portal>
    <TooltipPrimitive.Content
      className={cn('bg-light-dark px-3 py-2 text-[11px] text-main-gray rounded-lg')}
      {...props}
    >
      {children}
      <Arrow asChild>
        <Caret
          className="rotate-180"
          width="24"
          height="14"
          viewBox="0 0 22 12" />
      </Arrow>
    </TooltipPrimitive.Content>
  </Portal>
)

export default {
  TooltipProvider,
  Tooltip,
  Trigger,
  Arrow,
  Portal,
  Content
}