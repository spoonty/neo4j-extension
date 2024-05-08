import { useEffect, useState } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import { useGraphContext } from '@/features/graph/context'
import { labelManager } from '@/features/labels/LabelManager'
import { DEFAULT_PROPERTIES } from '@/features/modify-drawer/constants'
import {
  convertProperties,
  parseInitialProperties,
} from '@/features/modify-drawer/helpers'

export const useNodeModification = (initialNode?: NodeD3) => {
  const {
    createNode,
    updateNode,
    updateNodeTemplate,
    labels: currentLabels,
  } = useGraphContext()

  const [labels, setLabels] = useState<string[]>(initialNode?.labels || [])
  const [activeLabel, setActiveLabel] = useState(
    initialNode ? labels.indexOf(initialNode.settings.labelToDisplay) : 0,
  )

  const [properties, setProperties] = useState<KeyValue<'key' | 'value', any>>(
    initialNode ? parseInitialProperties(initialNode) : DEFAULT_PROPERTIES,
  )
  const [activeProperty, setActiveProperty] = useState(
    initialNode
      ? properties['key'].indexOf(initialNode.settings.propertyToDisplay) > -1
        ? properties['key'].indexOf(initialNode.settings.propertyToDisplay)
        : 1
      : 0,
  )

  const modifyHandler = async () => {
    initialNode
      ? await updateNode(
          initialNode.elementId,
          labels,
          activeLabel,
          convertProperties(properties),
          activeProperty - 1,
        )
      : await createNode(
          labels,
          activeLabel,
          convertProperties(properties),
          activeProperty,
        )
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

    const storageLabels = labelManager.getLabels()
    currentLabels.forEach((label) => {
      if (!Object.keys(storageLabels).includes(label)) {
        labelManager.addLabel(label)
      }
    })

    setLabels([])
    setProperties(DEFAULT_PROPERTIES)
  }

  useEffect(() => {
    updateNodeTemplate(
      labels,
      activeLabel,
      convertProperties(properties),
      initialNode ? activeProperty - 1 : activeProperty,
      initialNode,
    )
  }, [labels.length, activeLabel, activeProperty, properties])

  return {
    labels,
    activeLabel,
    setActiveLabel,
    properties,
    activeProperty,
    setActiveProperty,
    modifyHandler,
    addLabel,
    removeLabel,
    addProperty,
    deleteProperty,
    clearData,
    cancel,
  }
}
