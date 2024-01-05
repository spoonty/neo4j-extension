import { FC, useMemo, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import Badge from '@/ui/Badge'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import ScrollArea from '@/ui/ScrollArea'

const mockItems = [
  {
    label: 'Book1',
    value: 'book_1',
  },
  {
    label: 'Book2',
    value: 'book_2',
  },
  {
    label: 'Book3',
    value: 'book_3',
  },
  {
    label: 'Book4',
    value: 'book_4',
  },
  {
    label: 'Book5',
    value: 'book_5',
  },
  {
    label: 'Book6',
    value: 'book_6',
  },
  {
    label: 'Book7',
    value: 'book_7',
  },
  {
    label: 'Book8',
    value: 'book_8',
  },
  {
    label: 'Book9',
    value: 'book_9',
  },
  {
    label: 'Book10',
    value: 'book_10',
  },
]

interface Props {
  labels: string[]
  onAddLabel: (label: string) => void
  onRemoveLabel: (i: number) => void
}

const LabelsStep: FC<Props> = ({ labels, onAddLabel, onRemoveLabel }) => {
  const [label, setLabel] = useState('')

  const search = useMemo(() => {
    if (!label.length) return []

    const regex = new RegExp(`^${label}`, 'i')
    return mockItems.filter((item) => regex.test(item.label))
  }, [label])

  const addHandler = () => {
    onAddLabel(label)
    setLabel('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[11fr_1fr] items-center gap-2.5">
        <PopoverInput
          placeholder="Label"
          popoverItems={search}
          value={label}
          onValueChange={setLabel}
        />
        <IconButton disabled={!label.length} onClick={addHandler}>
          <PlusIcon />
        </IconButton>
      </div>
      <Clue>
        Node labels represent tags assigned to graph nodes for categorizing them
        by meaning or functionality.
      </Clue>

      <ScrollArea.Root className="mt-3 h-[90px]">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
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
}

export default LabelsStep
