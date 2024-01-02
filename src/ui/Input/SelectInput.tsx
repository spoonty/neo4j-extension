import { FC } from 'react'
import Input, { InputProps } from '@/ui/Input/Input'
import Select from '@/ui/Select'

const mockItems = [
  {
    label: 'Book',
    value: 'book',
  },
]

interface Props extends InputProps {}

const SelectInput: FC<Props> = ({ placeholder }) => {
  return (
    <Select items={mockItems}>
      <Input placeholder={placeholder} />
    </Select>
  )
}

export default SelectInput
