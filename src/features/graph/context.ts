import { createContext, useContext } from 'react'
import { NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationD3 } from '@/domain/neo4j/models/Relation'

export interface IGraphContext {
  nodes: NodeD3[]
  relations: RelationD3[]
  labels: string[]
  createNode: (node: NodeCreateDTO) => Promise<void>
  updateNodeTemplate: (labels: string[], properties: KeyValue) => void
  removeNodeTemplate: () => void
  clickHandler: (x: number, y: number) => void
}

export const GraphContext = createContext<IGraphContext>({
  nodes: [],
  relations: [],
  labels: [],
  createNode: async () => {},
  updateNodeTemplate: () => {},
  removeNodeTemplate: () => {},
  clickHandler: () => {},
})

export const useGraphContext = () => useContext(GraphContext)
