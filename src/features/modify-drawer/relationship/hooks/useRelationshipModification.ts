import { useEffect, useRef, useState } from 'react'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import { useGraphContext } from '@/features/graph/context'
import { DEFAULT_PROPERTIES } from '@/features/modify-drawer/constants'
import {
  convertProperties,
  parseInitialProperties,
} from '@/features/modify-drawer/helpers'

export const useRelationshipModification = (
  initialRelationship: RelationshipD3,
) => {
  const { createRelationship, updateRelationship, updateRelationshipTemplate } =
    useGraphContext()

  const updated = useRef(false)

  const [type, setType] = useState<string>(initialRelationship?.type || '')
  const [properties, setProperties] = useState<
    KeyValue<'key' | 'value', string[]>
  >(
    initialRelationship
      ? parseInitialProperties(initialRelationship)
      : DEFAULT_PROPERTIES,
  )

  const modifyHandler = async () => {
    if (initialRelationship) {
      updated.current = true
      await updateRelationship(
        initialRelationship.elementId,
        type,
        convertProperties(properties),
      )
    } else {
      await createRelationship(type, convertProperties(properties))
    }
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
    setType('')
    setProperties(DEFAULT_PROPERTIES)
  }

  useEffect(() => {
    updateRelationshipTemplate(
      type,
      convertProperties(properties),
      initialRelationship,
    )

    return () => {
      if (initialRelationship && !updated.current) {
        updateRelationshipTemplate(
          initialRelationship.type!,
          initialRelationship.properties,
          initialRelationship,
        )
      }
    }
  }, [type, properties])

  return {
    type,
    properties,
    modifyHandler,
    setType,
    addProperty,
    deleteProperty,
    clearData,
  }
}
