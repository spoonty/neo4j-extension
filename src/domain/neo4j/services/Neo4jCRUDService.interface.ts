import {Node, NodeCreateDTO, NodeUpdateDTO} from '@/domain/neo4j/models/Node'
import {Relationship, RelationshipCreateDTO} from '@/domain/neo4j/models/Relationship'
import {Graph} from "@/domain/neo4j/models/Graph";

export interface Neo4jCRUDService {
  getGraph(): Promise<Graph>
  createNode(node: NodeCreateDTO): Promise<Node>
  updateNode(nodeId: string, node: NodeUpdateDTO): Promise<Node>
  deleteNode(nodeId: string): Promise<void>
  createRelationship(relationship: RelationshipCreateDTO): Promise<Relationship>
}
