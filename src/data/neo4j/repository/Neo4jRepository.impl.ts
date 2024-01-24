import { NodeCreateDTO, NodeUpdateDTO } from '@/domain/graph/models/Node'
import {RelationshipCreateDTO, RelationshipUpdateDTO} from '@/domain/graph/models/Relationship'
import { GraphRepository } from '@/domain/graph/repository/GraphRepository.interface'
import { CRUDService } from '@/domain/graph/services/CRUDService.interface'

export class Neo4jRepositoryImpl implements GraphRepository {
  constructor(private crudService: CRUDService) {}

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
