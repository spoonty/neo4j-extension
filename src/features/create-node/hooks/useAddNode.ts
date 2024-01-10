import { useEffect, useState } from 'react'
import { NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { DEFAULT_PROPERTIES } from '@/features/create-node/constants'
import { useGraphContext } from '@/features/graph/context'

export const useAddNode = () => {
  const { updateNodeTemplate, removeNodeTemplate, createNode } =
    useGraphContext()

  const [labels, setLabels] = useState<string[]>([])
  const [properties, setProperties] = useState<KeyValue>(DEFAULT_PROPERTIES)

  const createNodeHandler = async () => {
    const node = new NodeCreateDTO(labels, convertProperties())
    await createNode(node)
  }

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

  const convertProperties = () => {
    const convertedProperties = {}

    // @ts-ignore
    properties['key'].forEach((key, i) => {
      convertedProperties[key] = properties['value'][i]
    })

    return convertedProperties
  }

  const clearData = () => {
    setLabels([])
    setProperties(DEFAULT_PROPERTIES)
  }

  useEffect(() => {
    updateNodeTemplate(labels, convertProperties())
  }, [labels.length, properties])

  useEffect(() => {
    updateNodeTemplate(labels, convertProperties())

    return () => {
      removeNodeTemplate()
    }
  }, []);

  return {
    labels,
    properties,
    createNodeHandler,
    addLabel,
    removeLabel,
    addProperty,
    clearData,
  }
}
