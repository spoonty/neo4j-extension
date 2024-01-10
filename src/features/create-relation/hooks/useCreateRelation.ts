import { useState } from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-relation/constants'
import { useGraphContext } from '@/features/graph/context'

export const useCreateRelation = () => {
  const { createRelation } = useGraphContext()

  const [type, setType] = useState<string>('')
  const [properties, setProperties] = useState<KeyValue>(DEFAULT_PROPERTIES)

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
    setType('')
    setProperties(DEFAULT_PROPERTIES)
  }

  const createRelationHandler = async () => {
    await createRelation(type, convertProperties())
  }

  return {
    type,
    properties,
    createRelationHandler,
    setType,
    addProperty,
    clearData,
  }
}
