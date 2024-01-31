import {NodeCreateDTO, NodeUpdateDTO} from '@/domain/entities/Node'
import {RelationshipCreateDTO, RelationshipUpdateDTO} from '@/domain/entities/Relationship'
import {GraphRepository} from '@/domain/interfaces/repositories/GraphRepository.interface'
import {Neo4jCRUDDatasource} from '@/data/interfaces/datasources/Neo4jCRUDDatasource.interface'

export class GraphRepositoryImpl implements GraphRepository {
    constructor(private crudService: Neo4jCRUDDatasource) {
    }

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
