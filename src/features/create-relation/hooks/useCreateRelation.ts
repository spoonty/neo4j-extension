import { useState } from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-relation/constants'

export const useCreateRelation = () => {
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

  return {
    type,
    properties,
    setType,
    addProperty,
    clearData,
  }
}
