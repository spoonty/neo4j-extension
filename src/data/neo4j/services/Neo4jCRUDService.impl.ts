import { Driver } from '@/data/driver/Driver.interface'
import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { Relation, RelationCreateDTO } from '@/domain/neo4j/models/Relation'
import { Neo4jCRUDService } from '@/domain/neo4j/services/Neo4jCRUDService.interface'

type NodeRelation = {
  n: ValueOrNull<Node>
  r: ValueOrNull<Relation>
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
      })

    const relations = result
      .map((record) => record.r)
      .filter((record) => !!record)

    return {
      nodes,
      relations,
    }
  }

  addNode = async (node: NodeCreateDTO): Promise<Node> => {
    const query = `
            CREATE (n:${node.labels.join(':')} $properties)
            RETURN n
        `

    const result = await this.driver.execute<Array<{ n: Node }>>(query, {
      properties: node.properties,
    })

    return result[0].n
  }

  createRelation = async (relation: RelationCreateDTO): Promise<any> => {
    const query = `
      MATCH (node1), (node2)
      WHERE id(node1) = ${
        relation.startNodeElementId.split(':').reverse()[0]
      } AND id(node2) = ${relation.endNodeElementId.split(':').reverse()[0]}
      CREATE (node1)-[r:${relation.type}]->(node2)
      SET r += $properties
      RETURN r
    `

    const result = await this.driver.execute<Array<{ r: Relation }>>(query, {
      properties: relation.properties,
    })

    return result[0].r
  }
}
