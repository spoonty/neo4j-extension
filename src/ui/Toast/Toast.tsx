import { createElement, FC, useState } from 'react'
import Close from '@/assets/icons/CloseIcon'
import { styleByType, Toast as TToast, typeIcon } from '@/ui/Toast/constants'
import { cn } from '@/utils/dom'
import * as ToastPrimitive from '@radix-ui/react-toast'

interface Props extends ToastPrimitive.ToastProps {
  toast: TToast
}

const Toast: FC<Props> = ({ toast, ...props }) => (
  <ToastPrimitive.Root
    className={cn(
      'mb-4 flex w-full max-w-xs items-center rounded-xl border border-border-dark bg-main-dark-opacity p-4 shadow-md backdrop-blur-md',
      'data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in',
    )}
    {...props}
  >
    <div
      className={cn(
        'inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
        styleByType[toast.type],
      )}
    >
      {createElement(typeIcon[toast.type])}
    </div>
    <ToastPrimitive.Description className="ms-3 text-sm font-normal text-main-gray">
      {toast.message}
    </ToastPrimitive.Description>
    <ToastPrimitive.Action
      className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-1.5 text-main-gray"
      altText="close"
    >
      <Close width="14" height="14" />
    </ToastPrimitive.Action>
  </ToastPrimitive.Root>
)

export default Toast
