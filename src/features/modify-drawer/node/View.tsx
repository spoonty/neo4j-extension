import { FC } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import { useGraphContext } from '@/features/graph/context'
import FirstStep from '@/features/modify-drawer/common/FirstStep'
import SecondStep from '@/features/modify-drawer/common/SecondStep'
import { Steps } from '@/features/modify-drawer/node/constants'
import { useNodeModification } from '@/features/modify-drawer/node/hooks/useNodeModification'
import ModifyDrawer, { ModifyDrawerProps } from '@/features/modify-drawer/View'

interface Props extends Pick<ModifyDrawerProps, 'onClose'> {
  initialNode: NodeD3
}

const View: FC<Props> = ({ initialNode, onClose }) => {
  const { labels: globalLabels } = useGraphContext()
  const {
    labels,
    activeLabel,
    setActiveLabel,
    properties,
    activeProperty,
    setActiveProperty,
    addLabel,
    removeLabel,
    addProperty,
    deleteProperty,
    modifyHandler,
    clearData,
    cancel,
  } = useNodeModification(initialNode)

  const steps = [Steps.SET_LABELS, Steps.SET_PROPERTIES]

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            currentValues={labels}
            values={globalLabels}
            activeLabel={activeLabel}
            description="Node labels represent tags assigned to graph nodes for categorizing them by meaning or functionality."
            setActiveLabel={setActiveLabel}
            add={addLabel}
            remove={removeLabel}
          />
        )
      case 1:
        return (
          <SecondStep
            properties={properties}
            description="Properties of nodes are key-value pairs that contain additional information about the nodes in a graph."
            add={addProperty}
            remove={deleteProperty}
            activeProperty={activeProperty}
            setActiveProperty={setActiveProperty}
          />
        )
    }
  }

  const nextStepDisabled = (step: number) => {
    return step === 0 && !labels.length
  }

  return (
    <ModifyDrawer
      title={initialNode ? 'UPDATE NODE' : 'CREATE NODE'}
      confirmText={initialNode ? 'Update' : 'Create'}
      steps={steps}
      nextStepDisabled={nextStepDisabled}
      properties={properties}
      renderStep={renderStep}
      modifyHandler={modifyHandler}
      onClose={onClose}
      clearData={clearData}
      cancel={cancel}
    />
  )
}

export default View
