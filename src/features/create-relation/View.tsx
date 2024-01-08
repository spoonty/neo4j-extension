import { FC, useState } from 'react'
import { Steps } from '@/features/create-relation/constants'
import { useCreateRelation } from '@/features/create-relation/hooks/useCreateRelation'
import TypeStep from '@/features/create-relation/steps/TypeStep'
import Button from '@/ui/Button/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'
import { cn } from '@/utils/dom'

interface Props {
  open: boolean
  onClose: () => void
}

const View: FC<Props> = ({ open, onClose }) => {
  const { type, setType, properties, clearData } = useCreateRelation()

  const [step, setStep] = useState(Steps.SET_TYPE)
  const steps = [Steps.SET_TYPE, Steps.SET_PROPERTIES]

  const onNextStep = () => {
    setStep(Steps.SET_PROPERTIES)
  }

  const onPrevStep = () => {
    setStep(Steps.SET_TYPE)
  }

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      setStep(Steps.SET_TYPE)
      clearData()
    }, 100)
  }

  const renderStep = () => {
    switch (step) {
      case Steps.SET_TYPE:
        return (
          <TypeStep
            currentType={type}
            onSetType={(type: string) => setType(type)}
            onClearType={() => setType('')}
          />
        )
    }
  }

  return (
    <Drawer open={open} modal={true}>
      <Content
        className={cn(
          step === Steps.SET_PROPERTIES &&
            properties['key'].length > 2 &&
            'h-[482px]',
        )}
      >
        <Header onClose={closeHandler}>CREATE RELATION</Header>
        <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5">
          <Stepper steps={steps} current={step} />
          {renderStep()}
        </div>
        <Footer>
          <div>
            {step === Steps.SET_PROPERTIES && (
              <Button onClick={onPrevStep}>Back</Button>
            )}
          </div>
          <Button variant="confirm" onClick={onNextStep}>
            {step === Steps.SET_PROPERTIES ? 'Create' : 'Next'}
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default View
