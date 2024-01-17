import { useEffect, useState } from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-relation/constants'
import { useGraphContext } from '@/features/graph/context'

export const useCreateRelationship = () => {
  const { createRelationship, updateRelationshipTemplate } = useGraphContext()

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

  const createRelationshipHandler = async () => {
    await createRelationship(type, convertProperties())
  }

  useEffect(() => {
    updateRelationshipTemplate(type, convertProperties())
  }, [type, properties])

  return {
    type,
    properties,
    createRelationshipHandler,
    setType,
    addProperty,
    clearData,
  }
}
