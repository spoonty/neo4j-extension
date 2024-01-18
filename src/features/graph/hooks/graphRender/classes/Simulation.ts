import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import * as d3 from 'd3'

export class Simulation {
  private readonly simulation: d3.Simulation<NodeD3, undefined>

  constructor(nodes: NodeD3[], relationships: RelationshipD3[], rendered: boolean, width: number, height: number) {
    this.simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(relationships)
          .id((d: any) => d.elementId)
          .distance(300)
      )
      .force('charge', d3.forceManyBody().strength(rendered ? 0 : -200))

    if (!rendered) {
      this.simulation.force('center', d3.forceCenter(width / 4, height / 2))
    }
    for (let i = 0; i < 1000; i++) {
      this.simulation.tick()
    }
  }

  public get get() {
    return this.simulation
  }
}
