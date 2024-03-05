import { Graph } from '@/domain/entities/Graph'
import { Node, NodeCreateDTO, NodeUpdateDTO } from '@/domain/entities/Node'
import {
  Relationship,
  RelationshipCreateDTO,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'

export interface Neo4jCRUDDatasource {
  getGraph(): Promise<Graph>

  createNode(node: NodeCreateDTO): Promise<Node>

  updateNode(nodeId: string, node: NodeUpdateDTO): Promise<Node>

  deleteNode(nodeId: string): Promise<void>

  createRelationship(relationship: RelationshipCreateDTO): Promise<Relationship>

  updateRelationship(
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ): Promise<Relationship>

  deleteRelationship(relationshipId: string): Promise<void>
}
