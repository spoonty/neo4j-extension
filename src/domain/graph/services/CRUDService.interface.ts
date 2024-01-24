import { Graph } from '@/domain/graph/models/Graph'
import { Node, NodeCreateDTO, NodeUpdateDTO } from '@/domain/graph/models/Node'
import {
  Relationship,
  RelationshipCreateDTO, RelationshipUpdateDTO,
} from '@/domain/graph/models/Relationship'

export interface CRUDService {
  getGraph(): Promise<Graph>
  createNode(node: NodeCreateDTO): Promise<Node>
  updateNode(nodeId: string, node: NodeUpdateDTO): Promise<Node>
  deleteNode(nodeId: string): Promise<void>
  createRelationship(relationship: RelationshipCreateDTO): Promise<Relationship>
  updateRelationship(relationshipId: string, relationship: RelationshipUpdateDTO): Promise<Relationship>
  deleteRelationship(relationshipId: string): Promise<void>
}
