import { useState } from 'react'
import SearchIcon from '@/assets/icons/SearchIcon'
import Input from '@/ui/Input/Input'

type TProps = {
  onSearch: (degree: number | null) => Promise<void>
}

export default function Degree({ onSearch }: TProps) {
  const [degree, setDegree] = useState('')

  const handler = async () => {
    await onSearch(degree.length ? Number(degree) : null)
    setDegree('')
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="px-2 text-xl font-bold leading-6 text-main-gray">
        Degree
      </h3>
      <div className="grid grid-cols-[85%_15%] items-center gap-2 px-2 text-light-blue">
        <Input placeholder="degree" value={degree} onValueChange={setDegree} />
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
