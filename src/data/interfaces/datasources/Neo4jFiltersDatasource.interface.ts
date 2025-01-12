import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'

export interface Neo4jFiltersDatasource {
  getGraphSize(): Promise<number>

  getLabels(): Promise<string[]>

  getTypes(): Promise<string[]>

  getByRange(page: number, pageSize: number): Promise<Graph>

  getByLabels(labels: string[]): Promise<Array<Node>>

  getByTypes(types: string[]): Promise<Graph>

  searchNodes(key: string, value: string): Promise<Array<Node>>

  getByDegree(degree: number): Promise<Graph>
}
