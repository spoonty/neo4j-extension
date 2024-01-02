import { FC } from 'react'
import Close from '@/assets/icons/CloseIcon'
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
  React.ComponentPropsWithRef<typeof DialogPrimitive.Content>
> = ({ children, className, ...props }) => (
  <Portal>
    <Overlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed z-[999] min-h-[512px] w-[512px] rounded p-4 shadow-md',
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
  <div className={cn('relative flex items-center justify-center', className)}>
    <div className="cursor-default text-2xl font-bold leading-6">
      {children}
    </div>
    <DialogPrimitive.DialogClose className="absolute right-0 top-[50%] translate-y-[-50%]">
      <Close width="20" height="20" />
    </DialogPrimitive.DialogClose>
  </div>
)

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => (
  <div className={className}>{children}</div>
)
