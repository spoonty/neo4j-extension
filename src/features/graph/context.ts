import { createContext, useContext } from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { DialogData } from '@/features/graph/hooks/useDialog'
import { InteractionState } from '@/features/graph/hooks/useGraph'

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
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void
  updateNodeTemplate: (
    labels: string[],
    properties: KeyValue,
    initialNode?: NodeD3,
  ) => void
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
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
