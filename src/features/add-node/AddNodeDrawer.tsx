import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import PopoverInput from '@/ui/Input/PopoverInput'

const AddNodeDrawer = () => {
  return (
    <Drawer open={true} modal={false}>
      <Content>
        <Header>CREATE NODE</Header>
        <div className="my-4 px-2">
          <PopoverInput placeholder="Label" />
        </div>
        <Footer></Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
