import { FC, useMemo, useState } from 'react'
import Input, { InputProps } from '@/ui/Input/Input'
import Popover from '@/ui/Popover'

interface Props extends InputProps {
  popoverItems: any[]
  onValueSelected: (value: string) => void
}

const PopoverInput: FC<Props> = ({
  value,
  popoverItems,
  onValueChange,
  onValueSelected,
  placeholder,
}) => {
  const [focus, setFocus] = useState(false)

  const closeHandler = () => {
    setTimeout(() => setFocus(false), 200)
  }

  return (
    <Popover
      items={popoverItems}
      open={!!popoverItems.length && focus}
      onValueChange={onValueSelected}
    >
      <Input
        placeholder={placeholder}
        className="w-full"
        onValueChange={onValueChange}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={closeHandler}
      />
    </Popover>
  )
}

export default PopoverInput
