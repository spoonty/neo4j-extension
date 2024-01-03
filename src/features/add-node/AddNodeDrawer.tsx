import { FC, useState } from 'react'
import LabelsStep from '@/features/add-node/steps/LabelsStep'
import PropertiesStep from '@/features/add-node/steps/PropertiesStep'
import Button from '@/ui/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'
import { cn } from '@/utils/dom'

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

  const onPrevStep = () => {
    setStep(step - 1)
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
          <LabelsStep
            labels={labels}
            onAddLabel={addLabel}
            onRemoveLabel={removeLabel}
          />
        )
      case 1:
        return <PropertiesStep />
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
          <div>{step > 0 && <Button onClick={onPrevStep}>Back</Button>}</div>
          <Button variant="confirm" onClick={onNextStep}>
            {step === steps.length - 1 ? 'Create' : 'Next'}
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
