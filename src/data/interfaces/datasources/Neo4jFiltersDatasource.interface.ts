import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'

export interface Neo4jFiltersDatasource {
  getByRange(rangeNumber: number): Promise<Graph>

  getByLabels(labels: string[]): Promise<Node>

  getByTypes(types: string[]): Promise<Graph>

  searchNodes(properties: KeyValue<string, string>): Promise<Node>

  getByDegree(degree: number): Promise<Graph>

  getByDistance(distance: number): Promise<Graph>

  getByPatters(labelsTypeSequence: string[]): Promise<Graph>
}
