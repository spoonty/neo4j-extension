import { Driver } from '@/data/driver/Driver.interface'
import { Node, NodeCreateDTO } from '@/domain/neo4j/models/Node'
import { Relation } from '@/domain/neo4j/models/Relation'
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

    const nodes = result.map((record) => record.n)
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
}
