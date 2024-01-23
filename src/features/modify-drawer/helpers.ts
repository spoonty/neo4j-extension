import {NodeD3} from "@/domain/neo4j/models/Node";
import {RelationshipD3} from "@/domain/neo4j/models/Relationship";

export const parseInitialProperties = (initialValue: NodeD3 | RelationshipD3) =>
  ({
    key: ['ID', ...Object.keys(initialValue.properties)],
    value: [
      initialValue.elementId,
      ...Object.keys(initialValue.properties).map(
        (key) => initialValue.properties[key],
      ),
    ],
  })

export const convertProperties = (properties: KeyValue<'key' | 'value', any>) => {
  const convertedProperties = {}

  // @ts-ignore
  properties['key'].forEach((key, i) => {
    if (key !== 'ID') {
      convertedProperties[key] = properties['value'][i]
    }
  })

  return convertedProperties
}