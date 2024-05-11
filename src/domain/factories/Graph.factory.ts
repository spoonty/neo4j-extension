import { Neo4jCRUDDatasourceImpl } from '@/data/datasources/neo4j/Neo4jCRUDDatasource'
import { Neo4jFiltersDatasourceImpl } from '@/data/datasources/neo4j/Neo4jFiltersDatasource'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { GraphRepository } from '@/domain/interfaces/repositories/GraphRepository.interface'
import { CreateNodeCase } from '@/domain/interfaces/usecases/CreateNodeCase.interface'
import { CreateRelationshipCase } from '@/domain/interfaces/usecases/CreateRelationshipCase.itnerface'
import { DeleteNodeCase } from '@/domain/interfaces/usecases/DeleteNodeCase.interface'
import { DeleteRelationshipCase } from '@/domain/interfaces/usecases/DeleteRelationshipCase.interface'
import { GetByLabelsCase } from '@/domain/interfaces/usecases/GetByLabelsCase.interface'
import { GetByRangeCase } from '@/domain/interfaces/usecases/GetByRangeCase.interface'
import { GetByTypesCase } from '@/domain/interfaces/usecases/GetByTypesCase'
import { GetGraphCase } from '@/domain/interfaces/usecases/GetGraphCase.interface'
import { GetGraphInfoCase } from '@/domain/interfaces/usecases/GetGraphInfoCase.interface'
import { UpdateNodeCase } from '@/domain/interfaces/usecases/UpdateNodeCase.interface'
import { UpdateRelationshipCase } from '@/domain/interfaces/usecases/UpdateRelationshipCase.interface'
import { GraphRepositoryImpl } from '@/domain/repositories/GraphRepository.impl'
import { CreateNodeCaseImpl } from '@/domain/usecases/graph/CreateNodeCase'
import { CreateRelationshipCaseImpl } from '@/domain/usecases/graph/CreateRelationshipCase'
import { DeleteRelationshipCaseImpl } from '@/domain/usecases/graph/DeleteRelationshipCase'
import { GetByLabelsCaseImpl } from '@/domain/usecases/graph/GetByLabelsCase'
import { GetByRangeCaseImpl } from '@/domain/usecases/graph/GetByRangeCase'
import { GetByTypesCaseImpl } from '@/domain/usecases/graph/GetByTypesCase'
import { GetGraphCaseImpl } from '@/domain/usecases/graph/GetGraphCase'
import { GetGraphSizeCaseImpl } from '@/domain/usecases/graph/GetGraphInfoCase'
import { UpdateNodeCaseImpl } from '@/domain/usecases/graph/UpdateNodeCase'
import { UpdateRelationshipCaseImpl } from '@/domain/usecases/graph/UpdateRelationshipCase'

export class GraphFactory {
  private graphRepository: GraphRepository

  constructor(driver: Driver) {
    const crudDatasource = new Neo4jCRUDDatasourceImpl(driver)
    const filtersDatasource = new Neo4jFiltersDatasourceImpl(driver)

    this.graphRepository = new GraphRepositoryImpl(
      crudDatasource,
      filtersDatasource,
    )
  }

  getGraphInfoCase(): GetGraphInfoCase {
    return new GetGraphSizeCaseImpl(this.graphRepository)
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

  getByLabelsCase(): GetByLabelsCase {
    return new GetByLabelsCaseImpl(this.graphRepository.getByLabels)
  }

  getByTypesCase(): GetByTypesCase {
    return new GetByTypesCaseImpl(this.graphRepository.getByTypes)
  }
}
