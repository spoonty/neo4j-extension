import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { RelationshipCreateDTO } from '@/domain/neo4j/models/Relationship'
import {Graph} from "@/domain/neo4j/models/Graph";

export interface Neo4jCRUDService {
  getGraph(): Promise<Graph>
  addNode(node: NodeCreateDTO): Promise<Node>
  deleteNode(nodeId: string): Promise<void>
  createRelation(relation: RelationshipCreateDTO): Promise<any>
}
