import {createContext, useContext} from 'react'
import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { InteractionState } from '@/features/graph/hooks/useGraph'
import {DialogData} from "@/features/graph/hooks/useDialog";

export interface IGraphContext {
  dialog: DialogData | null
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relationships: RelationshipD3[]
  labels: string[]
  types: string[]
  createNode: (labels: string[], properties: KeyValue) => Promise<void>
  deleteNode: () => Promise<void>
  createRelationship: (type: string, properties: KeyValue) => Promise<void>
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void
  updateNodeTemplate: (labels: string[], properties: KeyValue) => void
  clickHandler: <T>(payload: T) => void
}

export const GraphContext = createContext<IGraphContext>({
  dialog: null,
  state: { current: InteractionState.DEFAULT },
  nodes: [],
  relationships: [],
  labels: [],
  types: [],
  createNode: async () => {},
  deleteNode: async () => {},
  createRelationship: async () => {},
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
