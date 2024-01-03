import { FC } from 'react'
import Clue from '@/ui/Clue'
import Input from '@/ui/Input/Input'
import Table from '@/ui/Table/Table'

const data = {
  key: ['Title', 'Year'],
  value: ['Oppenheimer', '2023'],
}

const PropertiesStep: FC = () => (
  <div className="flex flex-col gap-2 px-2">
    <div className="grid grid-cols-[4fr_8fr] gap-2">
      <Input placeholder="Key" />
      <Input placeholder="Value" />
    </div>
    <Clue>
      Properties of vertices are key-value pairs that contain additional
      information about the nodes in a graph.
    </Clue>

    <Table data={data} className="mt-3" />
  </div>
)

export default PropertiesStep
