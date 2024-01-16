import { FC, useState } from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { Steps } from '@/features/create-node/constants'
import { useAddNode } from '@/features/create-node/hooks/useAddNode'
import LabelsStep from '@/features/create-node/steps/LabelsStep'
import PropertiesStep from '@/features/create-node/steps/PropertiesStep'
import Button from '@/ui/Button/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'
import { cn } from '@/utils/dom'

interface Props {
  initialNode?: NodeD3
  onClose: () => void
}

const View: FC<Props> = ({ initialNode, onClose }) => {
  const {
    labels,
    properties,
    createNodeHandler,
    addLabel,
    removeLabel,
    addProperty,
    deleteProperty,
    clearData,
  } = useAddNode(initialNode)

  const [step, setStep] = useState(Steps.SET_LABELS)
  const steps = [Steps.SET_LABELS, Steps.SET_PROPERTIES]

  const onNextStep = () => {
    setStep(Steps.SET_PROPERTIES)
  }

  const onPrevStep = () => {
    setStep(Steps.SET_LABELS)
  }

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      setStep(Steps.SET_LABELS)
      clearData()
    }, 100)
  }

  const createHandler = async () => {
    await createNodeHandler()
    closeHandler()
  }

  const renderStep = () => {
    switch (step) {
      case Steps.SET_LABELS:
        return (
          <LabelsStep
            nodeLabels={labels}
            onAddLabel={addLabel}
            onRemoveLabel={removeLabel}
          />
        )
      case Steps.SET_PROPERTIES:
        return (
          <PropertiesStep properties={properties} addProperty={addProperty} deleteHandler={deleteProperty} />
        )
    }
  }

  return (
    <Drawer open={true} modal={true}>
      <Content
        className={cn(
          step === Steps.SET_PROPERTIES &&
            properties['key'].length > 2 &&
            'h-[482px]',
        )}
      >
        <Header onClose={closeHandler}>
          {initialNode ? 'UPDATE NODE' : 'CREATE NODE'}
        </Header>
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
            onClick={step === Steps.SET_PROPERTIES ? createHandler : onNextStep}
          >
            {step === Steps.SET_PROPERTIES
              ? initialNode
                ? 'Update'
                : 'Create'
              : 'Next'}
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default View
