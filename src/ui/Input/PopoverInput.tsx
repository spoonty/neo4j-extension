import { FC, useMemo, useState } from 'react'
import Input, { InputProps } from '@/ui/Input/Input'
import Popover from '@/ui/Popover'

interface Props extends InputProps {
  popoverItems: any[]
  onValueSelected: (value: string) => void
  popoverWidth?: string
}

const PopoverInput: FC<Props> = ({
  value,
  popoverItems,
  onValueChange,
  onValueSelected,
  placeholder,
  popoverWidth,
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
      popoverWidth={popoverWidth}
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
