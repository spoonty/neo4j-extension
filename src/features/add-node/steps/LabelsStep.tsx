import { FC } from 'react'
import Badge from '@/ui/Badge'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import ScrollArea from '@/ui/ScrollArea'

interface Props {
  labels: string[]
  onAddLabel: (label: string) => void
  onRemoveLabel: (i: number) => void
}

const LabelsStep: FC<Props> = ({ labels, onAddLabel, onRemoveLabel }) => (
  <div className="flex flex-col gap-2 px-2">
    <PopoverInput onConfirm={onAddLabel} placeholder="Label" />
    <Clue>
      Node labels represent tags assigned to graph nodes for categorizing them
      by meaning or functionality.
    </Clue>

    <ScrollArea.Root className="mt-3 h-[90px]">
      <ScrollArea.Viewport className="h-full w-full">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(72px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
          {labels.map((label, index) => (
            <Badge onRemove={() => onRemoveLabel(index)}>{label}</Badge>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="mb-[6px] mt-[6px]"
      />
    </ScrollArea.Root>
  </div>
)

export default LabelsStep
