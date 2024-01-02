import { FC } from 'react'
import Close from '@/assets/icons/CloseIcon'
import Separator from '@/ui/Separator'
import { cn } from '@/utils/dom'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export const Drawer: FC<DialogPrimitive.DialogProps> = ({
  children,
  ...props
}) => <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>

export const Trigger = DialogPrimitive.Trigger

export const Portal: FC<DialogPrimitive.PortalProps> = ({ ...props }) => (
  <DialogPrimitive.Portal {...props} />
)

export const Overlay: FC<DialogPrimitive.DialogOverlayProps> = ({
  ...props
}) => <DialogPrimitive.Overlay {...props} />

export const Content: FC<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
> = ({ children, className, ...props }) => (
  <Portal>
    <Overlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed z-[999] min-h-[512px] w-[512px] rounded-xl bg-white p-4 shadow-md',
        'right-[20%] top-[50%] translate-x-[20%] translate-y-[-50%]',
        className,
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      {children}
    </DialogPrimitive.Content>
  </Portal>
)

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = ({ children, className, ...props }) => (
  <div className={cn('flex flex-col', className)}>
    <div className="flex items-center justify-between">
      <div className="cursor-default text-2xl font-bold leading-6">
        {children}
      </div>
      <DialogPrimitive.DialogClose>
        <Close width="20" height="20" />
      </DialogPrimitive.DialogClose>
    </div>
    <Separator
      className="mb-3 mt-1 h-[1px] bg-black bg-opacity-30"
      decorative
    />
  </div>
)

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => (
  <div className={className}>{children}</div>
)
