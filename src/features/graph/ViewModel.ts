import { GraphD3 } from '@/domain/entities/Graph'
import {
  Node,
  NodeCreateDTO,
  NodeD3,
  NodeUpdateDTO,
} from '@/domain/entities/Node'
import {
  Relationship,
  RelationshipCreateDTO,
  RelationshipD3,
  RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'
import { GraphFactory } from '@/domain/factories/Graph.factory'

export class ViewModel {
  constructor(private graphFactory: GraphFactory) {}

  async getGraphInfo() {
    const usecase = this.graphFactory.getGraphInfoCase()
    return await usecase.execute()
  }

  async getGraph() {
    const usecase = this.graphFactory.getGraphCase()
    const { nodes, relationships } = await usecase.execute()

    const { nodesD3, labels } = this.parseNodes(nodes)
    const { relationshipsD3, types } = this.parseRelationships(relationships)

    return new GraphD3(nodesD3, relationshipsD3, labels, types)
  }

  async getByRange(page: number, pageSize: number) {
    const usecase = this.graphFactory.getByRangeCase()
    const { nodes, relationships } = await usecase.execute(page, pageSize)

    const { nodesD3, labels } = this.parseNodes(nodes)
    const { relationshipsD3, types } = this.parseRelationships(relationships)

    return new GraphD3(nodesD3, relationshipsD3, labels, types)
  }

  async getByLabels(labels: string[]) {
    const usecase = this.graphFactory.getByLabelsCase()
    const nodes = await usecase.execute(labels)

    const { nodesD3 } = this.parseNodes(nodes)

    return nodesD3
  }

  async createNode(node: NodeCreateDTO) {
    const usecase = this.graphFactory.createNodeCase()
    return new NodeD3(await usecase.execute(node))
  }

  async createRelationship(relationship: RelationshipCreateDTO) {
    const usecase = this.graphFactory.createRelationshipCase()
    return new RelationshipD3(await usecase.execute(relationship))
  }

  async updateNode(
    node: Node,
    updatedNode: NodeUpdateDTO,
    relationships: RelationshipD3[],
    position: {
      x: number
      y: number
    },
  ) {
    const usecase = this.graphFactory.updateNodeCase()
    const result = new NodeD3(
      await usecase.execute(node, updatedNode),
      position.x,
      position.y,
    )

    return {
      node: result,
      relationships: this.updateRelationshipsConnections(result, relationships),
    }
  }

  async updateRelationship(
    relationshipId: string,
    relationship: RelationshipUpdateDTO,
  ) {
    const usecase = this.graphFactory.updateRelationshipCase()
    return new RelationshipD3(
      await usecase.execute(relationshipId, relationship),
    )
  }

  async deleteNode(nodeId: string) {
    const usecase = this.graphFactory.deleteNodeCase()
    return usecase.execute(nodeId)
  }

  async deleteRelationship(relationshipId: string) {
    const usecase = this.graphFactory.deleteRelationshipCase()
    return usecase.execute(relationshipId)
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
    })

    return { relationshipsD3, types }
  }

  private updateRelationshipsConnections(
    node: NodeD3,
    relationships: RelationshipD3[],
  ) {
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
