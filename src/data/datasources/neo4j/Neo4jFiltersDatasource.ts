import { Neo4jFiltersDatasource } from '@/data/interfaces/datasources/Neo4jFiltersDatasource.interface'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'
import { Relationship } from '@/domain/entities/Relationship'

export class Neo4jFiltersDatasourceImpl implements Neo4jFiltersDatasource {
  constructor(private driver: Driver) {}

  getGraphSize = async () => {
    const query = 'MATCH (n) RETURN count(n) as nodeCount'

    const result =
      await this.driver.execute<[{ nodeCount: { low: number } }]>(query)

    return result[0].nodeCount.low
  }

  getByRange = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize
    const limit = pageSize

    const query = `
      MATCH (n)-[r]->(m)
      RETURN n, r, m
      SKIP ${skip}
      LIMIT ${limit}
    `

    const result =
      await this.driver.execute<Array<{ n: Node; r: Relationship; m: Node }>>(
        query,
      )

    const uniqueNodes = new Set()

    const nodesN = result
      .map((record) => record.n)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const nodesM = result
      .map((record) => record.m)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const nodes = [...nodesN, ...nodesM]
    const nodesIds = nodes.map((record) => record.elementId)

    const relationships = result
      .map((record) => record.r)
      .filter((record) => !!record)
      .filter(
        (record) =>
          nodesIds.includes(record.startNodeElementId) &&
          nodesIds.includes(record.endNodeElementId),
      )

    return new Graph(nodes, relationships)
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
}
