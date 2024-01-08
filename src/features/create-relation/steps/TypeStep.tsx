import { FC, useState } from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import Badge from '@/ui/Badge'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'

interface Props {
  currentType: string
  onSetType: (type: string) => void
  onClearType: () => void
}

const TypeStep: FC<Props> = ({ currentType, onSetType, onClearType }) => {
  const [type, setType] = useState('')

  const addHandler = () => {
    onSetType(type)
    setType('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[11fr_1fr] items-center gap-2.5">
        <PopoverInput
          placeholder="Label"
          popoverItems={[]}
          value={type}
          onValueChange={setType}
        />
        <IconButton
          disabled={!type.length || !!currentType.length}
          onClick={addHandler}
        >
          <PlusIcon />
        </IconButton>
      </div>
      <Clue>
        Node labels represent tags assigned to graph nodes for categorizing them
        by meaning or functionality.
      </Clue>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
        {currentType && (
          <Badge onRemove={() => onClearType()}>{currentType}</Badge>
        )}
      </div>
    </div>
  )
}

export default TypeStep
