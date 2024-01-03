import { FC } from 'react'
import Badge from '@/ui/Badge'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import ScrollArea from '@/ui/ScrollArea'

const SetLabels: FC = () => {
  const handler = () => {}

  return (
    <div className="flex flex-col gap-2 px-2">
      <PopoverInput placeholder="Label" />
      <Clue>
        Node labels represent tags assigned to graph nodes for categorizing them
        by meaning or functionality.
      </Clue>
      <ScrollArea.Root className="mt-3 h-[90px]">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(72px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
            <Badge onRemove={handler}>Book</Badge>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="mb-[6px] mt-[6px]"
        />
      </ScrollArea.Root>
    </div>
  )
}

export default SetLabels
