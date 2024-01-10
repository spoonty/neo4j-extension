import {createContext, FunctionComponent, useContext} from 'react'
import { NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipCreateDTO, RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { InteractionState } from '@/features/graph/hooks/useGraph'
import {DialogData} from "@/features/graph/hooks/useDialog";

export interface IGraphContext {
  dialog: DialogData | null
  state: React.MutableRefObject<InteractionState>
  nodes: NodeD3[]
  relations: RelationshipD3[]
  labels: string[]
  types: string[]
  createRelationTargets: { source: string | null; target: string | null }
  createNode: (node: NodeCreateDTO) => Promise<void>
  deleteNode: (nodeId: string) => Promise<void>
  createRelation: (relation: RelationshipCreateDTO) => Promise<void>
  setSource: (sourceId: string) => void
  setTarget: (targetId: string) => void
  updateNodeTemplate: (labels: string[], properties: KeyValue) => void
  removeNodeTemplate: () => void
  clickHandler: <T>(payload: T) => void
}

export const GraphContext = createContext<IGraphContext>({
  dialog: null,
  state: { current: InteractionState.DEFAULT },
  nodes: [],
  relations: [],
  labels: [],
  types: [],
  createRelationTargets: { source: null, target: null },
  createNode: async () => {},
  deleteNode: async () => {},
  createRelation: async () => {},
  setSource: () => {},
  setTarget: () => {},
  updateNodeTemplate: () => {},
  removeNodeTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
