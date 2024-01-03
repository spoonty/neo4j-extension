import { FC, useState } from 'react'
import Clue from '@/ui/Clue'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import PopoverInput from '@/ui/Input/PopoverInput'
import Stepper from '@/ui/Stepper/Stepper'

interface Props {
  open: boolean
  onClose: () => void
}

const AddNodeDrawer: FC<Props> = ({ open, onClose }) => {
  const [step, setStep] = useState(0)

  const steps = ['Set Labels', 'Set Properties']

  return (
    <Drawer open={open} modal={false}>
      <Content>
        <Header onClose={onClose}>CREATE NODE</Header>
        <div className="my-4 flex flex-col gap-5">
          <Stepper steps={steps} current={step} />
          <div className="flex flex-col gap-2 px-2">
            <PopoverInput placeholder="Label" />
            <Clue>
              Node labels represent tags assigned to graph nodes for
              categorizing them by meaning or functionality.
            </Clue>
          </div>
        </div>
        <Footer></Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
