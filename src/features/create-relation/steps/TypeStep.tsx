import {FC, useMemo, useState} from 'react'
import PlusIcon from '@/assets/icons/PlusIcon'
import Badge from '@/ui/Badge'
import IconButton from '@/ui/Button/IconButton'
import Clue from '@/ui/Clue'
import PopoverInput from '@/ui/Input/PopoverInput'
import {useGraphContext} from "@/features/graph/context";

interface Props {
  currentType: string
  onSetType: (type: string) => void
  onClearType: () => void
}

const TypeStep: FC<Props> = ({ currentType, onSetType, onClearType }) => {
  const { types } = useGraphContext()

  const [type, setType] = useState('')

  const search = useMemo(() => {
    if (!type.length) return []

    const regex = new RegExp(`^${type}`, 'i')
    return types.filter((type) => regex.test(type))
  }, [type])

  const selectHandler = (value: string) => {
    onSetType(value)
    setType('')
  }

  const addHandler = () => {
    onSetType(type)
    setType('')
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="grid grid-cols-[11fr_1fr] items-center gap-2.5">
        <PopoverInput
          placeholder="Type"
          popoverItems={search}
          value={type}
          onValueChange={setType}
          onValueSelected={selectHandler}
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
          <Badge onRemove={() => onClearType()} style={{backgroundColor: '#bdbdbd'}}>{currentType}</Badge>
        )}
      </div>
    </div>
  )
}

export default TypeStep
