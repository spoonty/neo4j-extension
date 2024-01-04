import { FC, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import Input from '@/ui/Input/Input'
import ScrollArea from '@/ui/ScrollArea'
import Table from '@/ui/Table/Table'

interface Props {
  properties: KeyValue
  addProperty: (value: KeyValue) => void
}

const PropertiesStep: FC<Props> = ({ properties, addProperty }) => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const addHandler = () => {
    addProperty({ key, value })
    setKey('')
    setValue('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[3fr_8fr_1fr] items-center gap-2">
        <Input placeholder="Key" value={key} onValueChange={setKey} />
        <Input placeholder="Value" value={value} onValueChange={setValue} />
        <IconButton
          disabled={!key.length || !value.length}
          onClick={addHandler}
        >
          <PlusIcon />
        </IconButton>
      </div>
      <Clue>
        Properties of vertices are key-value pairs that contain additional
        information about the nodes in a graph.
      </Clue>

      {!!properties['key'].length && (
        <ScrollArea.Root className="mt-3 h-[192px] pe-3">
          <ScrollArea.Viewport className="h-full w-full">
            <Table data={properties} />
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

export default PropertiesStep
