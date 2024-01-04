import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'

export interface Neo4jCRUDService {
  getGraph(): any

  addNode(node: NodeCreateDTO): Promise<Node>
}
