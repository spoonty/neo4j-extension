import { NodeD3 } from '@/domain/entities/Node'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import * as d3 from 'd3'

export class Simulation {
  private readonly simulation: d3.Simulation<NodeD3, undefined>

  constructor(
    nodes: NodeD3[],
    relationships: RelationshipD3[],
    rendered: boolean,
  ) {
    this.simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(relationships)
          .id((d: any) => d.elementId)
          .distance(350),
      )
      .force('charge', d3.forceManyBody().strength(rendered ? 0 : -40))

    if (!rendered) {
      this.simulation.force('center', d3.forceCenter(0, 0))
      this.simulation.tick(300)

      this.simulation.alphaTarget(0.3).restart()
      this.simulation.alphaTarget(0)
    }
  }

  public get get() {
    return this.simulation
  }
}
