import { Neo4jCRUDDatasource } from '@/data/interfaces/datasources/Neo4jCRUDDatasource.interface'
import { Driver } from '@/data/interfaces/services/Driver.interface'
import { Graph } from '@/domain/entities/Graph'
import { Node, NodeCreateDTO, NodeUpdateDTO } from '@/domain/entities/Node'
import {
  Relationship,
  RelationshipCreateDTO,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'

export class Neo4jCRUDDatasourceImpl implements Neo4jCRUDDatasource {
  constructor(private driver: Driver) {}

  getGraph = async () => {
    const query = `
            MATCH (n)
            OPTIONAL MATCH (n)-[r]->(m)
            RETURN n, r
        `

    const result =
      await this.driver.execute<Array<{ n: Node; r: Relationship }>>(query)

    const uniqueNodes = new Set()

    const nodes = result
      .map((record) => record.n)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      })

    const relationships = result
      .map((record) => record.r)
      .filter((record) => !!record)

    return new Graph(nodes, relationships)
  }

  createNode = async (node: NodeCreateDTO): Promise<Node> => {
    const query = `
            CREATE (n:${node.labels.join(':')} $properties)
            RETURN n
        `

    const result = await this.driver.execute<Array<{ n: Node }>>(query, {
      properties: node.properties,
    })

    return result[0].n
  }

  updateNode = async (nodeId: string, node: NodeUpdateDTO) => {
    const query = `
      MATCH (n) WHERE ID(n)=${nodeId.split(':').reverse()[0]}
      REMOVE n:${node.labels.join(':')}
      SET n:${node.newLabels.join(':')}
      SET n += $properties
      RETURN n
    `

    const result = await this.driver.execute<Array<{ n: Node }>>(query, {
      properties: node.properties,
    })

    return result[0].n
  }

  deleteNode = async (nodeId: string): Promise<void> => {
    const query = `
      MATCH (n) where ID(n)=${nodeId.split(':').reverse()[0]}
      DETACH DELETE n
    `

    return await this.driver.execute(query)
  }

  createRelationship = async (
    relationship: RelationshipCreateDTO,
  ): Promise<Relationship> => {
    const query = `
      MATCH (node1), (node2)
      WHERE id(node1) = ${
        relationship.startNodeElementId.split(':').reverse()[0]
      } AND id(node2) = ${relationship.endNodeElementId.split(':').reverse()[0]}
      CREATE (node1)-[r:${relationship.type}]->(node2)
      SET r += $properties
      RETURN r
    `

    const result = await this.driver.execute<Array<{ r: Relationship }>>(
      query,
      {
        properties: relationship.properties,
      },
    )

    return result[0].r
  }

  updateRelationship = async (
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ): Promise<Relationship> => {
    const query = `
      MATCH (a) - [rOld] -> (b)
      WHERE ID(rOld) = ${relationshipId.split(':').reverse()[0]}
      DELETE rOld
      CREATE (a) - [r:${relationship.type}] -> (b)
      SET r += $properties
      return r
    `

    const result = await this.driver.execute<Array<{ r: Relationship }>>(
      query,
      {
        properties: relationship.properties,
      },
    )

    return result[0].r
  }

  deleteRelationship = async (relationshipId: string): Promise<void> => {
    const query = `
      MATCH ()-[r]-() WHERE id(r)=${
        relationshipId.split(':').reverse()[0]
      } DELETE r
    `

    return await this.driver.execute(query)
  }
}
