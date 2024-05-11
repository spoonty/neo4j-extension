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
  filtersApplied: boolean
  setFiltersApplied: (val: boolean) => void
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
  getByLabels: (labels: string[]) => Promise<void>
  getByTypes: (types: string[]) => Promise<void>
  getByDegree: (degree: number | null) => Promise<void>
  searchNodes: (key: string, value: string) => Promise<void>
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
  filtersApplied: true,
  setFiltersApplied: () => {},
  mode: null,
  getGraphByRange: async () => {},
  getByLabels: async () => {},
  getByTypes: async () => {},
  getByDegree: async () => {},
  searchNodes: async () => {},
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
