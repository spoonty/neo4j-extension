import { useEffect, useState } from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-node/constants'
import { useGraphContext } from '@/features/graph/context'

export const useAddNode = (open: boolean) => {
  const { updateNodeTemplate, removeNodeTemplate } = useGraphContext()

  const [labels, setLabels] = useState<string[]>([])
  const [properties, setProperties] = useState<KeyValue>(DEFAULT_PROPERTIES)

  const addLabel = (label: string) => {
    setLabels([...labels, label])
  }

  const removeLabel = (i: number) => {
    setLabels([...labels.slice(0, i), ...labels.slice(i + 1)])
  }

  const addProperty = (property: KeyValue) => {
    setProperties({
      key: [...properties['key'], property['key']],
      value: [...properties['value'], property['value']],
    })
  }

  const clearData = () => {
    setLabels([])
    setProperties(DEFAULT_PROPERTIES)
  }

  useEffect(() => {
    if (open) {
      updateNodeTemplate(labels, properties)
    } else {
      removeNodeTemplate()
    }
  }, [open, labels.length, Object.keys(properties).length])

  return {
    labels,
    properties,
    addLabel,
    removeLabel,
    addProperty,
    clearData,
  }
}
