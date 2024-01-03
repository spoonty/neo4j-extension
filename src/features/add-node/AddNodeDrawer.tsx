import { FC, useState } from 'react'
import Badge from '@/ui/Badge'
import Button from '@/ui/Button'
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

  const handler = () => {}

  return (
    <Drawer open={open} modal={false}>
      <Content className="">
        <Header onClose={onClose}>CREATE NODE</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5">
          <Stepper steps={steps} current={step} />
          <div className="flex flex-col gap-2 px-2">
            <PopoverInput placeholder="Label" />
            <Clue>
              Node labels represent tags assigned to graph nodes for
              categorizing them by meaning or functionality.
            </Clue>
            <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-3">
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
              <Badge onRemove={handler}>Book</Badge>
            </div>
          </div>
        </div>
        <Footer>
          <Button type="cancel">Cancel</Button>
          <Button>Next</Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
