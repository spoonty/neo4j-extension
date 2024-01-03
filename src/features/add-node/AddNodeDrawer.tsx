import { FC, useState } from 'react'
import SetLabels from '@/features/add-node/steps/SetLabels'
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

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SetLabels />
    }
  }

  return (
    <Drawer open={open} modal={false}>
      <Content className="">
        <Header onClose={onClose}>CREATE NODE</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5">
          <Stepper steps={steps} current={step} />
          {renderStep()}
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
