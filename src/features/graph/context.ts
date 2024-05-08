import { createContext, useContext } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import { InteractionState } from '@/features/graph/constants'
import { DialogData } from '@/features/graph/hooks/useDialog'

export interface IGraphContext {
  dialog: DialogData | null
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relationships: RelationshipD3[]
  labels: string[]
  types: string[]
  createNode: (
    labels: string[],
    activeLabel: number,
    properties: KeyValue,
    activeProperty: number,
  ) => Promise<void>
  updateNode: (
    nodeId: string,
    labels: string[],
    activeLabel: number,
    properties: KeyValue,
    activeProperty: number,
  ) => Promise<void>
  deleteNode: (nodeId: string) => Promise<void>
  createRelationship: (type: string, properties: KeyValue) => Promise<void>
  updateRelationship: (
    relationshipId: string,
    type: string,
    properties: KeyValue,
  ) => Promise<void>
  deleteRelationship: (relationshipId: string) => Promise<void>
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void | string
  updateNodeTemplate: (
    labels: string[],
    activeLabelIdx: number,
    properties: KeyValue,
    activeProperty: number,
    initialNode?: NodeD3,
  ) => void
  updateRelationshipTemplate: (
    type: string,
    properties: KeyValue,
    initialRelationship?: RelationshipD3,
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
  updateRelationship: async () => {},
  deleteRelationship: async () => {},
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  updateRelationshipTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
