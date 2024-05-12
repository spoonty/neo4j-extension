import { FC, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import Input from '@/ui/Input/Input'
import ScrollArea from '@/ui/ScrollArea'
import Table from '@/ui/Table/Table'
import { cn } from '@/utils/dom'

interface Props {
  properties: KeyValue
  description?: string
  activeProperty?: number
  setActiveProperty?: (idx: number) => void
  add: (value: KeyValue) => void
  remove: (i: number) => void
}

const SecondStep: FC<Props> = ({
  properties,
  description,
  activeProperty,
  setActiveProperty,
  add,
  remove,
}) => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const addHandler = () => {
    add({ key, value })
    setKey('')
    setValue('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[40%_50%_10%] items-center gap-2">
        <Input placeholder="Key" value={key} onValueChange={setKey} />
        <Input placeholder="Value" value={value} onValueChange={setValue} />
        <IconButton
          disabled={!key.length || !value.length}
          onClick={addHandler}
        >
          <PlusIcon />
        </IconButton>
      </div>
      <Clue>{description}</Clue>

      {!!properties['key'].length && (
        <ScrollArea.Root
          className={cn(
            'mt-3 pe-3',
            properties['key'].length < 3 ? 'h-[94px]' : 'h-[192px]',
          )}
        >
          <ScrollArea.Viewport className="h-full w-full">
            <Table
              data={properties}
              activeProperty={activeProperty}
              setActiveProperty={setActiveProperty}
              deleteAction={remove}
            />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="mb-[6px] mt-[6px]"
          />
        </ScrollArea.Root>
      )}
    </div>
  )
}

export default SecondStep
