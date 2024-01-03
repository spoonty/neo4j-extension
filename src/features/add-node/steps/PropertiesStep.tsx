import { FC } from 'react'
import Table from '@/ui/Table/Table'

const data = {
  key: ['Title', 'Year'],
  value: ['Oppenheimer', '2023'],
}

const PropertiesStep: FC = () => (
  <>
    <Table data={data} />
  </>
)

export default PropertiesStep
