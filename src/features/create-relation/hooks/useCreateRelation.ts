import { useState } from 'react'
import { RelationshipCreateDTO } from '@/domain/neo4j/models/Relationship'
import { DEFAULT_PROPERTIES } from '@/features/create-relation/constants'
import { useGraphContext } from '@/features/graph/context'

export const useCreateRelation = () => {
  const { createRelationTargets, createRelation } = useGraphContext()

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
    const relation = new RelationshipCreateDTO(
      createRelationTargets.source || '',
      createRelationTargets.target || '',
      type,
      convertProperties(),
    )
    await createRelation(relation)
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
