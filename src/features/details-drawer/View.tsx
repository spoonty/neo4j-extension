import { FC, PropsWithChildren } from 'react'
import { Content, Drawer, Header } from '@/ui/Drawer'
import ScrollArea from '@/ui/ScrollArea'
import Table from '@/ui/Table/Table'
import { cn } from '@/utils/dom'

export interface DetailsDrawerProps extends PropsWithChildren {
  title: string
  elementId: string
  properties: KeyValue
  className?: string
  onClose: () => void
}

const View: FC<DetailsDrawerProps> = ({
  children,
  title,
  elementId,
  properties,
  className,
  onClose,
}) => {
  const convertedProperties = {
    key: ['ID', ...Object.keys(properties)].filter(
      (p) => typeof properties[p] != 'object',
    ),
    value: [
      elementId.split(':').at(-1),
      ...Object.keys(properties)
        .map((key) => properties[key])
        .filter((p) => typeof p != 'object'),
    ],
  }

  return (
    <Drawer open modal={false}>
      <Content>
        <Header onClose={onClose}>{title}</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5 px-2">
          <ScrollArea.Root className="max-h-[90px]">
            <ScrollArea.Viewport className="h-full w-full">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 p-2">
                {children}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="mb-[6px] mt-[6px]"
            />
          </ScrollArea.Root>

          <ScrollArea.Root className={cn('pe-3', className)}>
            <ScrollArea.Viewport className="h-full w-full">
              <Table data={convertedProperties} />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="mb-[6px] mt-[6px]"
            />
          </ScrollArea.Root>
        </div>
      </Content>
    </Drawer>
  )
}

export default View
