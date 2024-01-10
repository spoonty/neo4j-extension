import { Driver } from '@/data/driver/Driver.interface'
import { Neo4jCRUDServiceImpl } from '@/data/neo4j/services/Neo4jCRUDService.impl'
import { NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { RelationshipCreateDTO } from '@/domain/neo4j/models/Relationship'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { Neo4jCRUDService } from '@/domain/neo4j/services/Neo4jCRUDService.interface'

export class Neo4jRepositoryImpl implements Neo4jRepository {
  private crudService: Neo4jCRUDService

  constructor(private driver: Driver) {
    this.crudService = new Neo4jCRUDServiceImpl(driver)
  }

  getGraph = async () => {
    return await this.crudService.getGraph()
  }

  createNode = async (node: NodeCreateDTO) => {
    return await this.crudService.createNode(node)
  }

  deleteNode = async (nodeId: string) => {
    return await this.crudService.deleteNode(nodeId)
  }

  createRelation = async (relation: RelationshipCreateDTO) => {
    return await this.crudService.createRelation(relation)
  }
}
