import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { RelationCreateDTO } from '@/domain/neo4j/models/Relation'

export interface Neo4jCRUDService {
  getGraph(): any
  addNode(node: NodeCreateDTO): Promise<Node>
  createRelation(relation: RelationCreateDTO): Promise<any>
}
