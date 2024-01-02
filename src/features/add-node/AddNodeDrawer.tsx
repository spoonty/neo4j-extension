import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import SelectInput from '@/ui/Input/SelectInput'

const AddNodeDrawer = () => {
  return (
    // <Drawer open={true} modal={false}>
    //   <Content>
    //     <Header>CREATE NODE</Header>
    //     <div>1234</div>
    //     <SelectInput placeholder="Label" />
    //     <Footer></Footer>
    //   </Content>
    // </Drawer>
    <SelectInput placeholder="Label" />
  )
}

export default AddNodeDrawer
