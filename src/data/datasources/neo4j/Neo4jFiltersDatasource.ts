import { Neo4jFiltersDatasource } from '@/data/interfaces/datasources/Neo4jFiltersDatasource.interface'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'

export class Neo4jFiltersDatasourceImpl implements Neo4jFiltersDatasource {
  constructor(private driver: Driver) {}

  getByRange(rangeNumber: number): Promise<Graph> {
    throw new Error('Method not implemented.')
  }

  getByLabels(labels: string[]): Promise<Node> {
    throw new Error('Method not implemented.')
  }

  getByTypes(types: string[]): Promise<Graph> {
    throw new Error('Method not implemented.')
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
