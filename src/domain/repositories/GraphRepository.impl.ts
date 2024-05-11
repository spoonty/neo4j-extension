import { Neo4jCRUDDatasource } from '@/data/interfaces/datasources/Neo4jCRUDDatasource.interface'
import { Neo4jFiltersDatasource } from '@/data/interfaces/datasources/Neo4jFiltersDatasource.interface'
import { Node, NodeCreateDTO, NodeUpdateDTO } from '@/domain/entities/Node'
import {
  RelationshipCreateDTO,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { Graph } from '../entities/Graph'

export class GraphRepositoryImpl implements GraphRepository {
  constructor(
    private crudService: Neo4jCRUDDatasource,
    private filtersService: Neo4jFiltersDatasource,
  ) {}

  getLabels = async () => {
    return await this.filtersService.getLabels()
  }
  getTypes = async () => {
    return await this.filtersService.getTypes()
  }

  getGraphSize = async () => {
    return await this.filtersService.getGraphSize()
  }
  getByRange = async (page: number, pageSize: number) => {
    return await this.filtersService.getByRange(page, pageSize)
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

  updateRelationship = async (
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ) => {
    return await this.crudService.updateRelationship(
      relationshipId,
      relationship,
    )
  }

  deleteRelationship = async (relationshipId: string) => {
    return await this.crudService.deleteRelationship(relationshipId)
  }

  getByLabels = async (labels: string[]) => {
    return await this.filtersService.getByLabels(labels)
  }

  getByTypes = async (types: string[]) => {
    return await this.filtersService.getByTypes(types)
  }

  searchNodes(properties: KeyValue<string, string>): Promise<Node> {
    throw new Error('Method not implemented.')
  }

  getByDegree(degree: number): Promise<Graph> {
    throw new Error('Method not implemented.')
  }

  getByDistance(distance: number): Promise<Graph> {
    throw new Error('Method not implemented.')
  }

  getByPatters(labelsTypeSequence: string[]): Promise<Graph> {
    throw new Error('Method not implemented.')
  }
}
