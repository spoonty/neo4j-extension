import { labelManager } from '@/features/labels/LabelManager'
import Badge from '@/ui/Badge'
import ScrollArea from '@/ui/ScrollArea'

type TProps = {
  labels: string[]
  selectedLabels: string[]
  handler: (label: string) => Promise<void>
}

export default function LabelsList({
  labels,
  selectedLabels,
  handler,
}: TProps) {
  return (
    <div>
      <h3 className="px-2 text-xl font-bold leading-6 text-main-gray">
        Labels
      </h3>
      <div className="mt-2 flex h-[calc(100%-88px)] flex-col gap-5 pe-2">
        {labels.length ? (
          <ScrollArea.Root className="max-h-[110px]">
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
        ) : (
          <span className="px-2 text-[11px] text-main-gray">
            There are no labels yet
          </span>
        )}
      </div>
    </div>
  )
}
