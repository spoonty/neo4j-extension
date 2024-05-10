import { useEffect, useState } from 'react'
import { useGraphContext } from '@/features/graph/context'
import { labelManager } from '@/features/labels/LabelManager'
import Badge from '@/ui/Badge'
import ScrollArea from '@/ui/ScrollArea'

export default function LabelsList() {
  const { labels, getByLabels } = useGraphContext()

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])

  const handler = async (label: string) => {
    let labels: string[] = []

    if (selectedLabels.includes(label)) {
      labels = selectedLabels.filter((l) => l !== label)
    } else {
      labels = [...selectedLabels, label]
    }

    setSelectedLabels(labels)

    await getByLabels(labels)
  }

  return (
    <div className="fixed end-6 top-6 h-[170px] w-[300px] p-3">
      <h3 className="px-2 text-2xl font-bold leading-6 text-main-gray">
        Labels
      </h3>
      <div className="mt-2 flex h-[calc(100%-88px)] flex-col gap-5 px-2">
        <ScrollArea.Root className="max-h-[100px]">
          <ScrollArea.Viewport className="h-full w-full">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 p-2">
              {labels.map((label) => (
                <Badge
                  style={{
                    backgroundColor: labelManager.getColor(label),
                    outline: `1px solid ${
                      selectedLabels.includes(label)
                        ? labelManager.getColor(label)
                        : ''
                    }`,
                    border: '2px solid',
                  }}
                  key={label}
                  onClick={() => handler(label)}
                >
                  {label}
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
