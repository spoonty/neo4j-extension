import Badge from '@/ui/Badge'
import ScrollArea from '@/ui/ScrollArea'

type TProps = {
  types: string[]
  selectedTypes: string[]
  handler: (type: string) => Promise<void>
}

export default function TypesList({ types, selectedTypes, handler }: TProps) {
  return (
    <div>
      <h3 className="px-2 text-xl font-bold leading-6 text-main-gray">Types</h3>
      <div className="mt-2 flex h-[calc(100%-88px)] flex-col gap-5 pe-2">
        {types.length ? (
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
        ) : (
          <span className="px-2 text-[11px] text-main-gray">
            There are no types yet
          </span>
        )}
      </div>
    </div>
  )
}
