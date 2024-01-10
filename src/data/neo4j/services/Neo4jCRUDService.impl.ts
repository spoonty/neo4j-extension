import { Driver } from '@/data/driver/Driver.interface'
import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { Relationship, RelationshipCreateDTO } from '@/domain/neo4j/models/Relationship'
import { Neo4jCRUDService } from '@/domain/neo4j/services/Neo4jCRUDService.interface'
import {Graph} from "@/domain/neo4j/models/Graph";

type NodeRelation = {
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

    const result = await this.driver.execute<Array<NodeRelation>>(query)

    const uniqueNodes = new Set()

    const nodes = result
      .map((record) => record.n)
      .filter((record) => {
        if (!uniqueNodes.has(record?.elementId)) {
          uniqueNodes.add(record?.elementId)
          return true
        }
        return false
      }).map((node) => new Node(node.elementId, node.identity, node.labels, node.properties))

    const relations = result
      .map((record) => record.r)
      .filter((record) => !!record)
      .map((relationship) => new Relationship(relationship.elementId, relationship.end, relationship.endNodeElementId, relationship.start, relationship.startNodeElementId, relationship.properties, relationship.type))

    return new Graph(nodes, relations)
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

  deleteNode = async (nodeId: string): Promise<void> => {
    const query = `
      MATCH (n) where ID(n)=${nodeId.split(':').reverse()[0]}
      DETACH DELETE n
    `

    return await this.driver.execute(query)
  }

  createRelation = async (relation: RelationshipCreateDTO): Promise<any> => {
    const query = `
      MATCH (node1), (node2)
      WHERE id(node1) = ${
        relation.startNodeElementId.split(':').reverse()[0]
      } AND id(node2) = ${relation.endNodeElementId.split(':').reverse()[0]}
      CREATE (node1)-[r:${relation.type}]->(node2)
      SET r += $properties
      RETURN r
    `

    const result = await this.driver.execute<Array<{ r: Relationship }>>(query, {
      properties: relation.properties,
    })

    return result[0].r
  }
}
