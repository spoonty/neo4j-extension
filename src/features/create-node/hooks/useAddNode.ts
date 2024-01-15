import { useEffect, useState } from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-node/constants'
import { useGraphContext } from '@/features/graph/context'
import {NodeD3} from "@/domain/neo4j/models/Node";

export const useAddNode = (initialNode?: NodeD3) => {
  const { updateNodeTemplate, createNode, updateNode } =
    useGraphContext()

  const [labels, setLabels] = useState<string[]>(initialNode ? initialNode.labels : [])
  const [properties, setProperties] = useState<KeyValue>(initialNode ? {
    key: ['ID', ...Object.keys(initialNode.properties)],
    value: [initialNode.elementId, ...Object.keys(initialNode.properties).map((key) => initialNode.properties[key])]
  } : DEFAULT_PROPERTIES)

  const createNodeHandler = async () => {
    if (initialNode) {
      await updateNode(initialNode.elementId, labels, convertProperties())
    } else {
      await createNode(labels, convertProperties())
    }
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
      if (key !== 'ID') {
        convertedProperties[key] = properties['value'][i]
      }
    })

    return convertedProperties
  }

  const clearData = () => {
    setLabels([])
    setProperties(DEFAULT_PROPERTIES)
  }

  useEffect(() => {
    updateNodeTemplate(labels, convertProperties(), initialNode)
  }, [labels.length, properties])

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
