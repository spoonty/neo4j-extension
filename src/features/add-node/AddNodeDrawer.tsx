import { FC, useState } from 'react'
import SetLabels from '@/features/add-node/steps/SetLabels'
import Button from '@/ui/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'

interface Props {
  open: boolean
  onClose: () => void
}

const AddNodeDrawer: FC<Props> = ({ open, onClose }) => {
  const [step, setStep] = useState(0)
  const [labels, setLabels] = useState<string[]>([])

  const steps = ['Set Labels', 'Set Properties']

  const addLabel = (label: string) => {
    setLabels([...labels, label])
  }

  const removeLabel = (i: number) => {
    setLabels([...labels.slice(0, i), ...labels.slice(i + 1)])
  }

  const onNextStep = () => {
    setStep(step + 1)
  }

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      setStep(0)
      setLabels([])
    }, 100)
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SetLabels
            labels={labels}
            onAddLabel={addLabel}
            onRemoveLabel={removeLabel}
          />
        )
    }
  }

  return (
    <Drawer open={open} modal={false}>
      <Content className="">
        <Header onClose={closeHandler}>CREATE NODE</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5">
          <Stepper steps={steps} current={step} />
          {renderStep()}
        </div>
        <Footer>
          <Button variant="cancel" onClick={closeHandler}>
            Cancel
          </Button>
          <Button onClick={onNextStep}>Next</Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
