import { Neo4jFiltersDatasource } from '@/data/interfaces/datasources/Neo4jFiltersDatasource.interface'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { Graph } from '@/domain/entities/Graph'
import { Node } from '@/domain/entities/Node'
import { Relationship } from '@/domain/entities/Relationship'

export class Neo4jFiltersDatasourceImpl implements Neo4jFiltersDatasource {
  constructor(private driver: Driver) {}

  getLabels = async () => {
    const query = 'CALL db.labels()'

    const result = await this.driver.execute<Array<{ label: string }>>(query)

    return result.map((record) => record.label)
  }
  getTypes = async () => {
    const query = `
      MATCH ()-[r]->()
      RETURN DISTINCT type(r) AS relationshipType
    `
    const result =
      await this.driver.execute<Array<{ relationshipType: string }>>(query)

    return result.map((record) => record.relationshipType)
  }

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
      MATCH (n)
      WITH DISTINCT n
      OPTIONAL MATCH (n)-[r]->(m)
      WITH n, r, m
      ORDER BY ID(n)
      SKIP ${skip}
      LIMIT ${limit}
      RETURN n, r, m
    `

    const result =
      await this.driver.execute<Array<{ n: Node; r: Relationship; m: Node }>>(
        query,
      )

    const uniqueNodes = new Set()

    const nodesN = result
      .map((record) => record.n)
      .filter((record) => !!record)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const nodesM = result
      .map((record) => record.m)
      .filter((record) => !!record)
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

  getByLabels = async (labels: string[]) => {
    const query = `
    MATCH (n)
    WHERE ${labels
      .map((label) => `any(label IN labels(n) WHERE label IN $labels)`)
      .join(' OR ')}
    RETURN n
    `

    const result = await this.driver.execute<{ n: Node }[]>(query, { labels })

    const nodes = result.map((record) => record.n)

    return nodes
  }

  getByTypes = async (types: string[]) => {
    const query = `
      MATCH (n)-[r]->(m)
      WHERE type(r) IN $types
      RETURN DISTINCT n, r, m
    `
    const result = await this.driver.execute<
      Array<{ n: Node; r: Relationship; m: Node }>
    >(query, { types })

    const uniqueNodes = new Set()

    const nodesN = result
      .map((record) => record.n)
      .filter((record) => !!record)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const nodesM = result
      .map((record) => record.m)
      .filter((record) => !!record)
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

  searchNodes = async (key: string, value: string) => {
    const query = `
      MATCH (n)
      WHERE n.${key} IS NOT NULL AND n.${key} =~ ('^' + $value + '.*')
      RETURN n
    `

    const result = await this.driver.execute<Array<{ n: Node }>>(query, {
      value: value,
    })

    return result.map((record) => record.n)
  }

  getByDegree = async (degree: number) => {
    const query = `
      MATCH (n)-[r]->(m)
      WITH n, COUNT(r) AS relCount
      WHERE relCount = $degree
      OPTIONAL MATCH (n)-[r]->(m)
      RETURN n, r, m
    `

    const result = await this.driver.execute<
      Array<{ n: Node; r: Relationship; m: Node }>
    >(query, { degree })

    const uniqueNodes = new Set()

    const nodesN = result
      .map((record) => record.n)
      .filter((record) => !!record)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const nodesM = result
      .map((record) => record.m)
      .filter((record) => !!record)
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
}
