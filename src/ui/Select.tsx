import { FC } from 'react'
import ScrollArea from '@/ui/ScrollArea'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'

enum POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface Item {
  label: string
  value: string
  icon?: React.ReactElement
}

interface Props {
  items: Item[]
  width?: string
  className?: string
  value?: Item
  onSelect?: (value: string) => void
  children: React.ReactElement
}

const Select: FC<Props> = ({
  children,
  items,
  width,
  className,
  value,
  onSelect,
}) => {
  return (
    <DropdownPrimitive.Root open={true} modal={false}>
      <DropdownPrimitive.Trigger>{children}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content>
          <ScrollArea.Root>
            <ScrollArea.Viewport>
              {items.map((item) => (
                <DropdownPrimitive.Item>{item.label}</DropdownPrimitive.Item>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="my-3 mr-2" />
          </ScrollArea.Root>
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  )
}

export default Select
