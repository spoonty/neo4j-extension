import { Neo4jCRUDDatasourceImpl } from '@/data/datasources/neo4j/Neo4jCRUDDatasource'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { CreateNodeCase } from '@/domain/interfaces/usecases/CreateNodeCase.interface'
import { CreateRelationshipCase } from '@/domain/interfaces/usecases/CreateRelationshipCase.itnerface'
import { DeleteNodeCase } from '@/domain/interfaces/usecases/DeleteNodeCase.interface'
import { DeleteRelationshipCase } from '@/domain/interfaces/usecases/DeleteRelationshipCase.interface'
import { GetByRangeCase } from '@/domain/interfaces/usecases/GetByRangeCase.interface'
import { GetGraphCase } from '@/domain/interfaces/usecases/GetGraphCase.interface'
import { UpdateNodeCase } from '@/domain/interfaces/usecases/UpdateNodeCase.interface'
import { UpdateRelationshipCase } from '@/domain/interfaces/usecases/UpdateRelationshipCase.interface'
import { GraphRepositoryImpl } from '@/domain/repositories/GraphRepository.impl'
import { CreateNodeCaseImpl } from '@/domain/usecases/graph/CreateNodeCase'
import { CreateRelationshipCaseImpl } from '@/domain/usecases/graph/CreateRelationshipCase'
import { DeleteRelationshipCaseImpl } from '@/domain/usecases/graph/DeleteRelationshipCase'
import { GetByRangeCaseImpl } from '@/domain/usecases/graph/GetByRangeCase'
import { GetGraphCaseImpl } from '@/domain/usecases/graph/GetGraphCase'
import { UpdateNodeCaseImpl } from '@/domain/usecases/graph/UpdateNodeCase'
import { UpdateRelationshipCaseImpl } from '@/domain/usecases/graph/UpdateRelationshipCase'

export class GraphFactory {
  private graphRepository: GraphRepository

  constructor(driver: Driver) {
    const crudDatasource = new Neo4jCRUDDatasourceImpl(driver)

    this.graphRepository = new GraphRepositoryImpl(crudDatasource)
  }

  getGraphCase(): GetGraphCase {
    return new GetGraphCaseImpl(this.graphRepository.getGraph)
  }

  createNodeCase(): CreateNodeCase {
    return new CreateNodeCaseImpl(this.graphRepository.createNode)
  }

  createRelationshipCase(): CreateRelationshipCase {
    return new CreateRelationshipCaseImpl(
      this.graphRepository.createRelationship,
    )
  }

  updateNodeCase(): UpdateNodeCase {
    return new UpdateNodeCaseImpl(this.graphRepository.updateNode)
  }

  updateRelationshipCase(): UpdateRelationshipCase {
    return new UpdateRelationshipCaseImpl(
      this.graphRepository.updateRelationship,
    )
  }

  deleteNodeCase(): DeleteNodeCase {
    return new DeleteRelationshipCaseImpl(this.graphRepository.deleteNode)
  }

  deleteRelationshipCase(): DeleteRelationshipCase {
    return new DeleteRelationshipCaseImpl(
      this.graphRepository.deleteRelationship,
    )
  }

  getByRangeCase(): GetByRangeCase {
    return new GetByRangeCaseImpl(this.graphRepository.getByRange)
  }
}
