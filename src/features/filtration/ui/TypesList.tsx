import { useState } from 'react'
import { useGraphContext } from '@/features/graph/context'
import Badge from '@/ui/Badge'
import ScrollArea from '@/ui/ScrollArea'

export default function TypesList() {
  const { types, getByTypes } = useGraphContext()

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handler = async (type: string) => {
    let types: string[] = []

    if (selectedTypes.includes(type)) {
      types = selectedTypes.filter((t) => t !== type)
    } else {
      types = [...selectedTypes, type]
    }

    setSelectedTypes(types)
    await getByTypes(types)
  }

  return (
    <div>
      <h3 className="px-2 text-2xl font-bold leading-6 text-main-gray">
        Types
      </h3>
      <div className="mt-2 flex h-[calc(100%-88px)] flex-col gap-5 pe-2">
        <ScrollArea.Root className="max-h-[110px]">
          <ScrollArea.Viewport className="h-full w-full">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 p-2">
              {types.map((type) => (
                <Badge
                  style={{
                    backgroundColor: '#bdbdbd',
                    outline: `1px solid ${
                      selectedTypes.includes(type) ? '#bdbdbd' : ''
                    }`,
                    border: '2px solid',
                  }}
                  key={type}
                  onClick={() => handler(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="mb-[6px] mt-[6px]"
          />
        </ScrollArea.Root>
      </div>
    </div>
  )
}
