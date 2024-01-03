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
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
> = ({ children, className, ...props }) => (
  <Portal>
    <Overlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed z-[999] h-[368px] w-[512px] rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md',
        'right-[20%] top-[50%] translate-x-[20%] translate-y-[-50%]',
        'data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
        className,
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      {children}
    </DialogPrimitive.Content>
  </Portal>
)

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void
}

export const Header: FC<HeaderProps> = ({
  children,
  className,
  onClose,
  ...props
}) => (
  <div className={cn('text-main-gray flex flex-col', className)} {...props}>
    <div className="flex items-center justify-between">
      <div className="cursor-default text-2xl font-bold leading-6">
        {children}
      </div>
      <DialogPrimitive.DialogClose>
        <Close width="20" height="20" onClick={onClose} />
      </DialogPrimitive.DialogClose>
    </div>
  </div>
)

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => (
  <div className={cn('flex justify-between', className)}>{children}</div>
)
