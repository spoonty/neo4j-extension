import { FC, useMemo, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import { labelManager } from '@/features/labels/LabelManager'
import Badge from '@/ui/Badge'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import ScrollArea from '@/ui/ScrollArea'

interface Props {
  currentValues: string[]
  activeLabel?: number
  setActiveLabel?: (idx: number) => void
  values: string[]
  add: (value: string) => void
  remove: (i: number) => void
}

const FirstStep: FC<Props> = ({
  currentValues,
  values,
  activeLabel,
  setActiveLabel,
  add,
  remove,
}) => {
  const [value, setValue] = useState('')

  const search = useMemo(() => {
    if (!value.length) return []

    const regex = new RegExp(`^${value}`, 'i')
    return values.filter((val) => regex.test(val))
  }, [value])

  const select = (val: string) => {
    add(val)
    setValue('')
  }

  const handler = () => {
    add(value)
    setValue('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[11fr_1fr] items-center gap-2.5">
        <PopoverInput
          placeholder="Label"
          popoverItems={search}
          value={value}
          onValueChange={setValue}
          onValueSelected={select}
        />
        <IconButton disabled={!value.length} onClick={handler}>
          <PlusIcon />
        </IconButton>
      </div>
      <Clue>
        Node labels represent tags assigned to graph nodes for categorizing them
        by meaning or functionality.
      </Clue>

      <ScrollArea.Root className="mt-3 h-[90px]">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 p-2">
            {currentValues.map((val, index) => (
              <Badge
                onRemove={() => remove(index)}
                style={{
                  backgroundColor: labelManager.getColor(val),
                  outline: `1px solid ${
                    activeLabel === index ? labelManager.getColor(val) : ''
                  }`,
                  border: '2px solid',
                }}
                onClick={() => setActiveLabel?.(index)}
              >
                {val}
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

export default FirstStep
