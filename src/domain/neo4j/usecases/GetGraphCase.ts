import { GetGraphError } from '@/domain/errors/GetGraphError'
import { GraphD3 } from '@/domain/neo4j/models/Graph'
import { Node, NodeD3 } from '@/domain/neo4j/models/Node'
import {
  Relationship,
  RelationshipD3,
} from '@/domain/neo4j/models/Relationship'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = Neo4jRepository['getGraph']

export abstract class GetGraphCase implements UseCase<Promise<GraphD3>> {
  abstract execute(): Promise<GraphD3>
}

export class GetGraphCaseImpl implements GetGraphCase {
  constructor(private getGraph: Func) {}

  async execute(): Promise<GraphD3> {
    try {
      const { nodes, relationships } = await this.getGraph()

      const { nodesD3, labels } = this.parseNodes(nodes)
      const { relationshipsD3, types } = this.parseRelationships(relationships)

      return new GraphD3(nodesD3, relationshipsD3, labels, types)
    } catch {
      throw new GetGraphError()
    }
  }

  private parseNodes = (nodes: Node[]) => {
    const nodesD3: NodeD3[] = []
    const labels: string[] = []

    nodes.forEach((node: Node) => {
      nodesD3.push(new NodeD3(node))

      node.labels.forEach((label) => {
        if (!labels.includes(label)) {
          labels.push(label)
        }
      })

      Object.keys(node.properties).map((key) => {
        node.properties[key] = node.properties[key].low || node.properties[key]
      })
    })

    return { nodesD3, labels }
  }

  private parseRelationships = (relationships: Relationship[]) => {
    const relationshipsD3: RelationshipD3[] = []
    const types: string[] = []

    relationships.forEach((relation: Relationship) => {
      relationshipsD3.push(new RelationshipD3(relation))

      if (relation.type && !types.includes(relation.type)) {
        types.push(relation.type)
      }

      Object.keys(relation.properties).map((key) => {
        relation.properties[key] = relation.properties[key].low || relation.properties[key]
      })
    })

    return { relationshipsD3, types }
  }
}
