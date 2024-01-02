import { FC } from 'react'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import PopoverInput from '@/ui/Input/PopoverInput'

interface Props {
  open: boolean
  onClose: () => void
}

const AddNodeDrawer: FC<Props> = ({ open, onClose }) => {
  return (
    <Drawer open={open} modal={false}>
      <Content>
        <Header onClose={onClose}>CREATE NODE</Header>
        <div className="my-4 px-2">
          <PopoverInput placeholder="Label" />
        </div>
        <Footer></Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
