import { FC, useState } from 'react'
import { NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { Steps } from '@/features/add-node/constants'
import { useAddNode } from '@/features/add-node/hooks/useAddNode'
import LabelsStep from '@/features/add-node/steps/LabelsStep'
import PropertiesStep from '@/features/add-node/steps/PropertiesStep'
import Button from '@/ui/Button/Button'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Stepper from '@/ui/Stepper/Stepper'
import { cn } from '@/utils/dom'

interface Props {
  open: boolean
  createNodeTemplate: (labels: string[], properties: KeyValue) => void
  removeNodeTemplate: () => void
  createNode: (node: NodeCreateDTO) => Promise<void>
  onClose: () => void
}

const AddNodeDrawer: FC<Props> = ({
  open,
  createNodeTemplate,
  removeNodeTemplate,
  createNode,
  onClose,
}) => {
  const { labels, properties, addLabel, removeLabel, addProperty, clearData } =
    useAddNode(open, createNodeTemplate, removeNodeTemplate)

  const [step, setStep] = useState(Steps.SET_LABELS)
  const steps = [Steps.SET_LABELS, Steps.SET_LABELS]

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
    const convertedProperties = {}

    // @ts-ignore
    properties['key'].forEach((key, i) => {
      convertedProperties[key] = properties['value'][i]
    })

    const node = new NodeCreateDTO(labels, convertedProperties)
    await createNode(node)
    closeHandler()
  }

  const renderStep = () => {
    switch (step) {
      case Steps.SET_LABELS:
        return (
          <LabelsStep
            labels={labels}
            onAddLabel={addLabel}
            onRemoveLabel={removeLabel}
          />
        )
      case Steps.SET_PROPERTIES:
        return (
          <PropertiesStep properties={properties} addProperty={addProperty} />
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
        <Header onClose={closeHandler}>CREATE NODE</Header>
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
            {step === Steps.SET_PROPERTIES ? 'Create' : 'Next'}
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default AddNodeDrawer
