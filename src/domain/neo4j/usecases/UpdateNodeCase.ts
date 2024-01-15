import { UpdateNodeError } from '@/domain/errors/UpdateNodeError'
import { NodeD3, NodeUpdateDTO } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import { Neo4jRepository } from '@/domain/neo4j/repository/Neo4jRepository.interface'
import { UseCase } from '@/utils/domain'

type Func = Neo4jRepository['updateNode']

export abstract class UpdateNodeCase
  implements
    UseCase<Promise<{ node: NodeD3; relationships: RelationshipD3[] }>>
{
  abstract execute(
    node: NodeD3,
    updatedNode: NodeUpdateDTO,
    relationships: RelationshipD3[],
  ): Promise<{ node: NodeD3; relationships: RelationshipD3[] }>
}

export class UpdateNodeCaseImpl implements UpdateNodeCase {
  constructor(private updateNode: Func) {}

  async execute(
    node: NodeD3,
    updatedNode: NodeUpdateDTO,
    relationships: RelationshipD3[],
  ): Promise<{ node: NodeD3; relationships: RelationshipD3[] }> {
    try {
      const update = new NodeD3(
        await this.updateNode(node.elementId, updatedNode),
        node.x,
        node.y,
      )
      return {
        node: update,
        relationships: this.parseRelationships(update, relationships),
      }
    } catch {
      throw new UpdateNodeError()
    }
  }

  private parseRelationships(node: NodeD3, relationships: RelationshipD3[]) {
    const parsedRelationships: RelationshipD3[] = []

    relationships.forEach((relationship) => {
      if (relationship.endNodeElementId === node.elementId) {
        relationship.target = node.elementId
      } else if (relationship.startNodeElementId === node.elementId) {
        relationship.source = node.elementId
      }

      parsedRelationships.push(relationship)
    })

    return parsedRelationships
  }
}
