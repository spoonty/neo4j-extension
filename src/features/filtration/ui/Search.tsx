import { useState } from 'react'
import SearchIcon from '@/assets/icons/SearchIcon'
import Input from '@/ui/Input/Input'

type TProps = {
  onSearch: (key: string, value: string) => Promise<void>
}

export default function Search({ onSearch }: TProps) {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')

  const handler = async () => {
    await onSearch(key, value)
    setKey('')
    setValue('')
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="px-2 text-xl font-bold leading-6 text-main-gray">
        Search
      </h3>
      <div className="grid grid-cols-[30%_55%_15%] items-center gap-2 px-2 text-light-blue">
        <Input placeholder="key" value={key} onValueChange={setKey} />
        <Input placeholder="value" value={value} onValueChange={setValue} />
        <SearchIcon
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handler}
        />
      </div>
    </div>
  )
}
