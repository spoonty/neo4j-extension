import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import PopoverInput from '@/ui/Input/PopoverInput'

const AddNodeDrawer = () => {
  return (
    <Drawer open={true} modal={false}>
      <Content>
        <Header>CREATE NODE</Header>
        <PopoverInput placeholder="Label" />
        <Footer></Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
