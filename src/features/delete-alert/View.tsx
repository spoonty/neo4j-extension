import { FC } from 'react'
import Warning from '@/assets/icons/WarningIcon'
import { useGraphContext } from '@/features/graph/context'
import { Alert, Content, Footer } from '@/ui/Alert'
import Button from '@/ui/Button/Button'

interface Props {
  onClose: () => void
}

const View: FC<Props> = ({ onClose }) => {
  const { deleteNode } = useGraphContext()

  return (
    <Alert open>
      <Content className="flex flex-col gap-3 p-4">
        <Warning
          width="48"
          height="48"
          className="mx-auto my-0 text-red-alert"
        />
        <div className="mb-4 text-center text-main-gray">
          Are you sure you want to delete this node?
        </div>
        <Footer className="flex justify-between">
          <Button variant={'cancel'} onClick={deleteNode}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Footer>
      </Content>
    </Alert>
  )
}

export default View
