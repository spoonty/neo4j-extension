import { createContext, useContext } from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { InteractionState } from '@/features/graph/constants'
import { DialogData } from '@/features/graph/hooks/useDialog'

export interface IGraphContext {
  dialog: DialogData | null
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relationships: RelationshipD3[]
  labels: string[]
  types: string[]
  createNode: (labels: string[], properties: KeyValue) => Promise<void>
  updateNode: (
    nodeId: string,
    labels: string[],
    properties: KeyValue,
  ) => Promise<void>
  deleteNode: () => Promise<void>
  createRelationship: (type: string, properties: KeyValue) => Promise<void>
  deleteRelationship: (relationshipId: string) => Promise<void>
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void | string
  updateNodeTemplate: (
    labels: string[],
    properties: KeyValue,
    initialNode?: NodeD3,
  ) => void
  updateRelationshipTemplate: (type: string, properties: KeyValue) => void
  clickHandler: (payload: any) => void
}

export const GraphContext = createContext<IGraphContext>({
  dialog: null,
  state: { current: InteractionState.DEFAULT },
  nodes: [],
  relationships: [],
  labels: [],
  types: [],
  createNode: async () => {},
  updateNode: async () => {},
  deleteNode: async () => {},
  createRelationship: async () => {},
  deleteRelationship: async () => {},
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  updateRelationshipTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
