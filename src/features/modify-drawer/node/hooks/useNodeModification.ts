import {NodeD3} from "@/domain/entities/Node";
import {useGraphContext} from "@/features/graph/context";
import {useEffect, useState} from "react";
import {DEFAULT_PROPERTIES} from "@/features/modify-drawer/constants";
import {convertProperties, parseInitialProperties} from "@/features/modify-drawer/helpers";
import {labelManager} from "@/features/labels/LabelManager";

export const useNodeModification = (initialNode?: NodeD3) => {
    const {createNode, updateNode, updateNodeTemplate, labels: currentLabels} = useGraphContext()

    const [labels, setLabels] = useState<string[]>(
        initialNode?.labels || []
    )

    const [properties, setProperties] = useState<KeyValue<'key' | 'value', any>>(
        initialNode ? parseInitialProperties(initialNode) : DEFAULT_PROPERTIES
    )

    const modifyHandler = async () => {
        initialNode
            ? await updateNode(initialNode.elementId, labels, convertProperties(properties))
            : await createNode(labels, convertProperties(properties))
    }

    const addLabel = (label: string) => {
        labelManager.addLabel(label)
        setLabels([...labels, label])
    }

    const removeLabel = (i: number) => {
        labelManager.removeLabel(labels[i])
        setLabels([...labels.slice(0, i), ...labels.slice(i + 1)])
    }

    const addProperty = (property: KeyValue) => {
        setProperties({
            key: [...properties['key'], property['key']],
            value: [...properties['value'], property['value']],
        })
    }

    const deleteProperty = (idx: number) => {
        setProperties({
            // @ts-ignore
            key: properties['key'].filter((_, i) => i !== idx),
            // @ts-ignore
            value: properties['value'].filter((_, i) => i !== idx),
        })
    }

    const clearData = () => {
        setLabels([])
        setProperties(DEFAULT_PROPERTIES)
    }

    const cancel = () => {
        labels.forEach((label) => {
            if (!currentLabels.includes(label)) {
                labelManager.removeLabel(label)
            }
        })

        const storageLabels = labelManager.getLabels();
        currentLabels.forEach((label) => {
            if (!Object.keys(storageLabels).includes(label)) {
                labelManager.addLabel(label);
            }
        })

        setLabels([])
        setProperties(DEFAULT_PROPERTIES)
    }

    useEffect(() => {
        updateNodeTemplate(labels, convertProperties(properties), initialNode)
    }, [labels.length, properties])

    return {
        labels,
        properties,
        modifyHandler,
        addLabel,
        removeLabel,
        addProperty,
        deleteProperty,
        clearData,
        cancel,
    }
}