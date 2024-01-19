import {useEffect, useRef, useState} from 'react'
import { DEFAULT_PROPERTIES } from '@/features/create-relation/constants'
import { useGraphContext } from '@/features/graph/context'
import {RelationshipD3} from "@/domain/neo4j/models/Relationship";

export const useCreateRelationship = (initialRelationship?: RelationshipD3) => {
  const updated = useRef(false)

  const { createRelationship, updateRelationship, updateRelationshipTemplate } = useGraphContext()

  const [type, setType] = useState<string>(initialRelationship?.type || '')
  const [properties, setProperties] = useState<KeyValue<'key' | 'value', string[]>>(
    initialRelationship
      ? {
        key: ['ID', ...Object.keys(initialRelationship.properties)],
        value: [
          initialRelationship.elementId,
          ...Object.keys(initialRelationship.properties).map(
            (key) => initialRelationship.properties[key],
          ),
        ],
      }
      : DEFAULT_PROPERTIES,
  )

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
    setType('')
    setProperties(DEFAULT_PROPERTIES)
  }

  const createRelationshipHandler = async () => {
    if (initialRelationship) {
      updated.current = true
      await updateRelationship(initialRelationship.elementId, type, convertProperties())
    } else {
      await createRelationship(type, convertProperties())
    }
  }

  useEffect(() => {
    updateRelationshipTemplate(type, convertProperties(), initialRelationship)

    return () => {
      if (initialRelationship && !updated.current) {
        updateRelationshipTemplate(initialRelationship.type!, initialRelationship.properties, initialRelationship)
      }
    }
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
