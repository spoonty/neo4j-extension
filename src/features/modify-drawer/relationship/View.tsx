import ModifyDrawer, {ModifyDrawerProps} from '@/features/modify-drawer/View'
import {RelationshipD3} from "@/domain/neo4j/models/Relationship";
import {FC} from "react";
import {useGraphContext} from "@/features/graph/context";
import {useRelationshipModification} from "@/features/modify-drawer/relationship/hooks/useRelationshipModification";
import FirstStep from "@/features/modify-drawer/common/FirstStep";
import SecondStep from "@/features/modify-drawer/common/SecondStep";
import {Steps} from "@/features/modify-drawer/relationship/constants";

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
    clearData
  } = useRelationshipModification(initialRelationship)

  const steps = [Steps.SET_TYPE, Steps.SET_PROPERTIES]

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep
          currentValues={type.length ? [type] : []}
          values={globalTypes}
          add={(value) => setType(value)}
          remove={() => setType('')}
        />
      case 1:
        return <SecondStep properties={properties} add={addProperty} remove={deleteProperty} />
    }
  }

  return <ModifyDrawer
    title={initialRelationship ? 'UPDATE RELATIONSHIP' : 'CREATE RELATIONSHIP'}
    confirmText={initialRelationship ? 'Update' : 'Create'}
    steps={steps}
    properties={properties}
    renderStep={renderStep}
    modifyHandler={modifyHandler}
    onClose={onClose}
    clearData={clearData}
  />
}

export default View