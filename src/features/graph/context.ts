import { createContext, useContext } from 'react'
import { NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationCreateDTO, RelationD3 } from '@/domain/neo4j/models/Relation'
import { InteractionState } from '@/features/graph/hooks/useGraph'

export interface IGraphContext {
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relations: RelationD3[]
  labels: string[]
  types: string[]
  createRelationTargets: { source: string | null; target: string | null }
  createRelationDialog: boolean
  removeNodeDialog: { open: boolean, nodeId: string | null }
  createNode: (node: NodeCreateDTO) => Promise<void>
  deleteNode: (nodeId: string) => Promise<void>
  createRelation: (relation: RelationCreateDTO) => Promise<void>
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void
  updateNodeTemplate: (labels: string[], properties: KeyValue) => void
  removeNodeTemplate: () => void
  clickHandler: <T>(payload: T) => void
  closeCreateRelationDialog: () => void
  closeRemoveNodeDialog: () => void
}

export const GraphContext = createContext<IGraphContext>({
  state: { current: InteractionState.DEFAULT },
  nodes: [],
  relations: [],
  labels: [],
  types: [],
  createRelationTargets: { source: null, target: null },
  createRelationDialog: false,
  removeNodeDialog: { open: false, nodeId: '' },
  createNode: async () => {},
  deleteNode: async () => {},
  createRelation: async () => {},
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  removeNodeTemplate: () => {},
  clickHandler: () => {},
  closeCreateRelationDialog: () => {},
  closeRemoveNodeDialog: () => {}
})

export const useGraphContext = () => useContext(GraphContext)
