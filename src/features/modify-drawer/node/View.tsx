import {FC} from "react";
import ModifyDrawer, {ModifyDrawerProps} from '@/features/modify-drawer/View'
import {NodeD3} from "@/domain/entities/Node";
import {useNodeModification} from "@/features/modify-drawer/node/hooks/useNodeModification";
import FirstStep from "@/features/modify-drawer/common/FirstStep";
import {useGraphContext} from "@/features/graph/context";
import SecondStep from "@/features/modify-drawer/common/SecondStep";
import {Steps} from "@/features/modify-drawer/node/constants";

interface Props extends Pick<ModifyDrawerProps, 'onClose'> {
    initialNode: NodeD3
}

const View: FC<Props> = ({initialNode, onClose}) => {
    const {labels: globalLabels} = useGraphContext()
    const {
        labels,
        properties,
        addLabel,
        removeLabel,
        addProperty,
        deleteProperty,
        modifyHandler,
        clearData
    } = useNodeModification(initialNode)

    const steps = [Steps.SET_LABELS, Steps.SET_PROPERTIES]

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return <FirstStep
                    currentValues={labels}
                    values={globalLabels}
                    add={addLabel}
                    remove={removeLabel}
                />
            case 1:
                return <SecondStep properties={properties} add={addProperty} remove={deleteProperty}/>
        }
    }

    return <ModifyDrawer
        title={initialNode ? 'UPDATE NODE' : 'CREATE NODE'}
        confirmText={initialNode ? 'Update' : 'Create'}
        steps={steps}
        properties={properties}
        renderStep={renderStep}
        modifyHandler={modifyHandler}
        onClose={onClose}
        clearData={clearData}
    />
}

export default View