import { Node, NodeD3 } from '@/domain/entities/Node'
import { Relationship, RelationshipD3 } from '@/domain/entities/Relationship'

export class Graph {
  constructor(
    readonly nodes: Node[],
    readonly relationships: Relationship[],
  ) {}
}

export class GraphD3 {
  constructor(
    readonly nodes: NodeD3[],
    readonly relationships: RelationshipD3[],
    readonly labels: string[],
    readonly types: string[],
  ) {}
}
