import { FC } from 'react'
import { cn } from '@/utils/dom'
import * as AlertPrimitive from '@radix-ui/react-alert-dialog'

export const Alert = AlertPrimitive.Root

export const Trigger = AlertPrimitive.Trigger

export const Portal = AlertPrimitive.Portal

export const Overlay: FC<AlertPrimitive.AlertDialogOverlayProps> = ({
  className,
  ...props
}) => {
  return (
    <AlertPrimitive.Overlay
      className={cn(
        'bg-background-opacity fixed top-0 z-[998] h-full w-full  backdrop-blur-md',
        className,
      )}
      {...props}
    />
  )
}

export const Content: FC<
  React.ComponentPropsWithoutRef<typeof AlertPrimitive.Content>
> = ({ children, className, ...props }) => {
  return (
    <Portal>
      <Overlay />
      <AlertPrimitive.Content
        className={cn(
          'fixed z-[999] w-[448px] rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md transition-all',
          'right-[50%] top-[50%] translate-x-[50%] translate-y-[-50%]',
          'data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
          className,
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </AlertPrimitive.Content>
    </Portal>
  )
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ children, className, ...props }) => (
  <div className={cn('flex justify-between', className)}>{children}</div>
)
