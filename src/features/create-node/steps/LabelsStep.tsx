import { FC, useMemo, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import { useGraphContext } from '@/features/graph/context'
import { defineLabelColor } from '@/features/graph/helpers/colors'
import Badge from '@/ui/Badge'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import ScrollArea from '@/ui/ScrollArea'

interface Props {
  nodeLabels: string[]
  onAddLabel: (label: string) => void
  onRemoveLabel: (i: number) => void
}

const LabelsStep: FC<Props> = ({ nodeLabels, onAddLabel, onRemoveLabel }) => {
  const { labels } = useGraphContext()

  const [label, setLabel] = useState('')

  const search = useMemo(() => {
    if (!label.length) return []

    const regex = new RegExp(`^${label}`, 'i')
    return labels.filter((label) => regex.test(label))
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
            {nodeLabels.map((label, index) => (
              <Badge
                onRemove={() => onRemoveLabel(index)}
                style={{ backgroundColor: defineLabelColor(labels, label) }}
              >
                {label}
              </Badge>
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
