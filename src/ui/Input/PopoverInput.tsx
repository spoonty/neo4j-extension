import { FC, useMemo, useState } from 'react'
import Input, { InputProps } from '@/ui/Input/Input'
import Popover from '@/ui/Popover'

const mockItems = [
  {
    label: 'Book 1',
    value: 'book_1',
  },
  {
    label: 'Book 2',
    value: 'book_2',
  },
  {
    label: 'Book 3',
    value: 'book_3',
  },
  {
    label: 'Book 4',
    value: 'book_4',
  },
  {
    label: 'Book 5',
    value: 'book_5',
  },
  {
    label: 'Book 6',
    value: 'book_6',
  },
  {
    label: 'Book 7',
    value: 'book_7',
  },
  {
    label: 'Book 8',
    value: 'book_8',
  },
  {
    label: 'Book 9',
    value: 'book_9',
  },
  {
    label: 'Book 10',
    value: 'book_10',
  },
]

interface Props extends InputProps {}

const PopoverInput: FC<Props> = ({ placeholder }) => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)

  const search = useMemo(() => {
    if (!value.length) return []

    const regex = new RegExp(`^${value}`, 'i')
    return mockItems.filter((item) => regex.test(item.label))
  }, [value])

  const closeHandler = () => {
    setTimeout(() => setFocus(false), 200)
  }

  return (
    <Popover
      items={search}
      open={!!search.length && focus}
      onValueChange={setValue}
    >
      <Input
        placeholder={placeholder}
        className="w-full"
        onValueChange={setValue}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={closeHandler}
      />
    </Popover>
  )
}

export default PopoverInput
