import { Driver } from '@/data/driver/Driver.interface'
import { Graph } from '@/domain/neo4j/models/Graph'
import { Node, NodeCreateDTO, NodeUpdateDTO } from '@/domain/neo4j/models/Node'
import {
  Relationship,
  RelationshipCreateDTO,
} from '@/domain/neo4j/models/Relationship'
import { Neo4jCRUDService } from '@/domain/neo4j/services/Neo4jCRUDService.interface'

type NodeRelationship = {
  n: Node
  r: Relationship
}

export class Neo4jCRUDServiceImpl implements Neo4jCRUDService {
  constructor(private driver: Driver) {}

  getGraph = async () => {
    const query = `
            MATCH (n)
            OPTIONAL MATCH (n)-[r]->(m)
            RETURN n, r
        `

    const result = await this.driver.execute<Array<NodeRelationship>>(query)

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
}
