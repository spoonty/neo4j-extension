import { FC } from 'react'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import { useGraphContext } from '@/features/graph/context'
import FirstStep from '@/features/modify-drawer/common/FirstStep'
import SecondStep from '@/features/modify-drawer/common/SecondStep'
import { Steps } from '@/features/modify-drawer/relationship/constants'
import { useRelationshipModification } from '@/features/modify-drawer/relationship/hooks/useRelationshipModification'
import ModifyDrawer, { ModifyDrawerProps } from '@/features/modify-drawer/View'

interface Props extends Pick<ModifyDrawerProps, 'onClose'> {
  initialRelationship: RelationshipD3
}

const View: FC<Props> = ({ initialRelationship, onClose }) => {
  const { types: globalTypes } = useGraphContext()
  const {
    type,
    properties,
    setType,
    addProperty,
    deleteProperty,
    modifyHandler,
    clearData,
  } = useRelationshipModification(initialRelationship)

  const steps = [Steps.SET_TYPE, Steps.SET_PROPERTIES]

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            currentValues={type.length ? [type] : []}
            values={globalTypes}
            description="Types are labels that define relationships between nodes in the graph, allowing for classification and organization of data based on their semantics or purpose"
            add={(value) => setType(value)}
            remove={() => setType('')}
          />
        )
      case 1:
        return (
          <SecondStep
            properties={properties}
            description="Properties of relationships are key-value pairs that contain additional information about the relationships in a graph."
            add={addProperty}
            remove={deleteProperty}
          />
        )
    }
  }

  const nextStepDisabled = (step: number) => {
    return step === 0 && !type.length
  }

  return (
    <ModifyDrawer
      title={
        initialRelationship ? 'UPDATE RELATIONSHIP' : 'CREATE RELATIONSHIP'
      }
      confirmText={initialRelationship ? 'Update' : 'Create'}
      steps={steps}
      nextStepDisabled={nextStepDisabled}
      properties={properties}
      renderStep={renderStep}
      modifyHandler={modifyHandler}
      onClose={onClose}
      clearData={clearData}
    />
  )
}

export default View
