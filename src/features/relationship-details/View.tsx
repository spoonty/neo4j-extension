import { FC } from 'react'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import Badge from '@/ui/Badge'
import { Content, Drawer, Header } from '@/ui/Drawer'
import ScrollArea from '@/ui/ScrollArea'
import Table from '@/ui/Table/Table'

interface Props {
  relationship?: RelationshipD3
  onClose: () => void
}

const View: FC<Props> = ({ relationship, onClose }) => {
  if (!relationship) return null

  const properties = {
    key: ['ID', ...Object.keys(relationship.properties)],
    value: [
      relationship.elementId,
      ...Object.keys(relationship.properties).map(
        (key) => relationship.properties[key],
      ),
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
                <Badge style={{ backgroundColor: '#bdbdbd' }}>
                  {relationship.type}
                </Badge>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="mb-[6px] mt-[6px]"
            />
          </ScrollArea.Root>

          <ScrollArea.Root className="h-[250px] pe-3">
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
