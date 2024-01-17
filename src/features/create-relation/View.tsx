import { FC, useState } from 'react'
import { Steps } from '@/features/create-relation/constants'
import { useCreateRelationship } from '@/features/create-relation/hooks/useCreateRelation'
import PropertiesStep from '@/features/create-relation/steps/PropertiesStep'
import TypeStep from '@/features/create-relation/steps/TypeStep'
import Button from '@/ui/Button/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'
import { cn } from '@/utils/dom'

interface Props {
  onClose: () => void
}

const View: FC<Props> = ({ onClose }) => {
  const {
    type,
    setType,
    properties,
    addProperty,
    clearData,
    createRelationshipHandler,
  } = useCreateRelationship()

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

  const handler = async () => {
    await createRelationshipHandler()
    closeHandler()
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
      case Steps.SET_PROPERTIES:
        return (
          <PropertiesStep properties={properties} addProperty={addProperty} />
        )
    }
  }

  return (
    <Drawer open modal>
      <Content
        className={cn(
          step === Steps.SET_PROPERTIES &&
            properties['key'].length > 2 &&
            'h-[482px]',
        )}
      >
        <Header onClose={closeHandler}>CREATE RELATIONSHIP</Header>
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
          <Button
            variant="confirm"
            onClick={step === Steps.SET_PROPERTIES ? handler : onNextStep}
          >
            {step === Steps.SET_PROPERTIES ? 'Create' : 'Next'}
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default View
