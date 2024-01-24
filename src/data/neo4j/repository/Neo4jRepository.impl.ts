import { NodeCreateDTO, NodeUpdateDTO } from '@/domain/neo4j/models/Node'
import {RelationshipCreateDTO, RelationshipUpdateDTO} from '@/domain/neo4j/models/Relationship'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { Neo4jCRUDService } from '@/domain/neo4j/services/Neo4jCRUDService.interface'

export class Neo4jRepositoryImpl implements Neo4jRepository {
  constructor(private crudService: Neo4jCRUDService) {}

  getGraph = async () => {
    return await this.crudService.getGraph()
  }

  createNode = async (node: NodeCreateDTO) => {
    return await this.crudService.createNode(node)
  }

  updateNode = async (nodeId: string, node: NodeUpdateDTO) => {
    return await this.crudService.updateNode(nodeId, node)
  }

  deleteNode = async (nodeId: string) => {
    return await this.crudService.deleteNode(nodeId)
  }

  createRelationship = async (relationship: RelationshipCreateDTO) => {
    return await this.crudService.createRelationship(relationship)
  }

  updateRelationship = async (relationshipId: string, relationship: RelationshipUpdateDTO) => {
    return await this.crudService.updateRelationship(relationshipId, relationship)
  }

  deleteRelationship = async (relationshipId: string) => {
    return await this.crudService.deleteRelationship(relationshipId)
  }
}
