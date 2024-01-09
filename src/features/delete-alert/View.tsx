import {FC} from "react";
import {Alert, Content, Footer} from "@/ui/Alert";
import Button from "@/ui/Button/Button";
import Warning from "@/assets/icons/WarningIcon";

interface Props {
  open: boolean
}

const View: FC<Props> = ({ open }) => {
  return <Alert open={open}>
    <Content className="p-4 flex flex-col gap-3">
      <Warning width="48" height="48" className="text-red-alert my-0 mx-auto" />
      <div className="text-main-gray text-center mb-4">
        Are you sure you want to delete this node?
      </div>
      <Footer className="flex justify-between">
        <Button variant={"cancel"}>Delete</Button>
        <Button>Cancel</Button>
      </Footer>
    </Content>
  </Alert>
}

export default View