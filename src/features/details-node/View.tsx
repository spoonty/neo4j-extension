import { FC } from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { useGraphContext } from '@/features/graph/context'
import { defineLabelColor } from '@/features/graph/helpers/labels'
import Badge from '@/ui/Badge'
import Button from '@/ui/Button/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import ScrollArea from '@/ui/ScrollArea'
import Table from '@/ui/Table/Table'
import { cn } from '@/utils/dom'

interface Props {
  node?: NodeD3
  onClose: () => void
}

const View: FC<Props> = ({ node, onClose }) => {
  const { labels } = useGraphContext()

  if (!node) return null

  const properties = {
    key: ['ID', ...Object.keys(node.properties)],
    value: [
      node.elementId,
      ...Object.keys(node.properties).map((key) => node.properties[key]),
    ],
  }

  return (
    <Drawer open modal={false}>
      <Content>
        <Header onClose={onClose}>NODE DETAILS</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5 px-2">
          <ScrollArea.Root className="max-h-[90px]">
            <ScrollArea.Viewport className="h-full w-full">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(86px,_1fr))] gap-x-3.5 gap-y-3 pe-3">
                {node.labels.map((label) => (
                  <Badge
                    style={{ backgroundColor: defineLabelColor(labels, label) }}
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

          <ScrollArea.Root className="h-[230px] pe-3">
            <ScrollArea.Viewport className="h-full w-full">
              <Table data={properties} />
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
