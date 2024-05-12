import { FC } from 'react'
import Warning from '@/assets/icons/WarningIcon'
import { useGraphContext } from '@/features/graph/context'
import { Alert, Content, Footer } from '@/ui/Alert'
import Button from '@/ui/Button/Button'

interface Props {
  nodeId?: string
  relationshipsAmount?: number
  onClose: () => void
}

const View: FC<Props> = ({ nodeId, relationshipsAmount, onClose }) => {
  const { deleteNode } = useGraphContext()

  const alertAmount = `relationship${relationshipsAmount === 1 ? '' : 's'}`

  return (
    <Alert open>
      <Content className="flex flex-col gap-3 p-4">
        <Warning
          width="48"
          height="48"
          className="mx-auto my-0 text-red-alert"
        />
        <div className="mb-4 text-center text-main-gray">
          {`This node has ${relationshipsAmount} ${alertAmount}.
            If you delete this node, relationships will also be deleted.
            Are you sure you want to delete this node?`}
        </div>
        <Footer className="flex justify-between">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant={'cancel'} onClick={() => deleteNode(nodeId!)}>
            Delete
          </Button>
        </Footer>
      </Content>
    </Alert>
  )
}

export default View
