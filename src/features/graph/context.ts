import { createContext, useContext } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import { InteractionState, Mode } from '@/features/graph/constants'
import { DialogData } from '@/features/graph/hooks/useDialog'

export interface IGraphContext {
  dialog: DialogData | null
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relationships: RelationshipD3[]
  labels: string[]
  types: string[]
  graphSize: number
  mode: Mode | null
  page: number
  getGraphByRange: (page: number, pageSize: number) => Promise<void>
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
  setMode: (mode: Mode) => void
}

export const GraphContext = createContext<IGraphContext>({
  dialog: null,
  state: { current: InteractionState.DEFAULT },
  nodes: [],
  relationships: [],
  labels: [],
  types: [],
  graphSize: 0,
  page: 1,
  mode: null,
  getGraphByRange: async () => {},
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
  setMode: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
