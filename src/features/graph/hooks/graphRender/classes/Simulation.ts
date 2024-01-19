import { NodeD3 } from '@/domain/neo4j/models/Node'
import { RelationshipD3 } from '@/domain/neo4j/models/Relationship'
import * as d3 from 'd3'

export class Simulation {
  private readonly simulation: d3.Simulation<NodeD3, undefined>

  constructor(
    nodes: NodeD3[],
    relationships: RelationshipD3[],
    rendered: boolean,
    width: number,
    height: number,
  ) {
    this.simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(relationships)
          .id((d: any) => d.elementId)
          .distance(250),
      )
      .force('charge', d3.forceManyBody().strength(rendered ? 0 : -50))

    if (!rendered) {
      this.simulation.force('center', d3.forceCenter(width / 4, height / 2))
      this.simulation.tick(300)

      this.simulation.alphaTarget(0.3).restart()
      this.simulation.alphaTarget(0)
    }
  }

  public get get() {
    return this.simulation
  }
}
