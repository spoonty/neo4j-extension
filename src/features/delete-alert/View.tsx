import {FC} from "react";
import {Alert, Content, Footer} from "@/ui/Alert";
import Button from "@/ui/Button/Button";
import Warning from "@/assets/icons/WarningIcon";
import {useGraphContext} from "@/features/graph/context";

interface Props {
  onClose: () => void
}

const View: FC<Props> = ({ onClose }) => {
  const { deleteNode } = useGraphContext()

  const handler = () => {
    // if (removeNodeDialog.nodeId) {
    //   deleteNode(removeNodeDialog.nodeId)
    // }
  }

  return <Alert open>
    <Content className="p-4 flex flex-col gap-3">
      <Warning width="48" height="48" className="text-red-alert my-0 mx-auto" />
      <div className="text-main-gray text-center mb-4">
        Are you sure you want to delete this node?
      </div>
      <Footer className="flex justify-between">
        <Button variant={"cancel"} onClick={handler}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Footer>
    </Content>
  </Alert>
}

export default View