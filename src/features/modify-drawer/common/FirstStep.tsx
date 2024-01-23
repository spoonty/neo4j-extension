import {FC, PropsWithChildren, useMemo, useState} from "react";
import PopoverInput from "@/ui/Input/PopoverInput";
import IconButton from "@/ui/Button/IconButton";
import PlusIcon from "@/assets/icons/PlusIcon";
import Clue from "@/ui/Clue";
import ScrollArea from "@/ui/ScrollArea";
import Badge from "@/ui/Badge";
import {defineLabelColor} from "@/features/graph/helpers/labels";

interface Props {
  currentValues: string[]
  values: string[]
  add: (value: string) => void
  remove: (i: number) => void
}

const FirstStep: FC<Props> = ({ currentValues, values, add, remove }) => {
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
          <PlusIcon/>
        </IconButton>
      </div>
      <Clue>
        Node labels represent tags assigned to graph nodes for categorizing them
        by meaning or functionality.
      </Clue>

      <ScrollArea.Root className="mt-3 h-[90px]">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
            {currentValues.map((val, index) => (
              <Badge
                onRemove={() => remove(index)}
                style={{backgroundColor: defineLabelColor(values, val)}}
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