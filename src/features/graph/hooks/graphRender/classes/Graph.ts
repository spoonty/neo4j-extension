import {Container} from "@/features/graph/hooks/graphRender/classes/Container";
import {RefObject} from "react";
import {NodeD3} from "@/domain/neo4j/models/Node";
import {RelationshipD3} from "@/domain/neo4j/models/Relationship";
import {Simulation} from "@/features/graph/hooks/graphRender/classes/Simulation";
import {Group} from "@/features/graph/hooks/graphRender/classes/Group";
import {Relationship} from "@/features/graph/hooks/graphRender/classes/Relationship";
import {Node} from "@/features/graph/hooks/graphRender/classes/Node";
import {IGraphContext} from "@/features/graph/context";
import {clickZoom, zoom} from "@/features/graph/helpers/zoom";
import * as d3 from 'd3'
import {InteractionState} from "@/features/graph/constants";

export class Graph {
  private container: Container | null = null
  private simulation: Simulation | null = null
  private group: Group | null = null
  private relationship: Relationship | null = null
  private node: Node | null = null

  private scale: number = 1
  private position: { x: number, y: number } = { x: 0, y: 0 }
  private optionsOpened = false

  constructor(private svg: RefObject<SVGSVGElement>) {}

  public render(context: Partial<IGraphContext>) {
    if (!context.nodes || !context.relationships) return

    this.container = new Container(this.svg)
    this.simulation = new Simulation(context.nodes, context.relationships)
    this.group = new Group(this.container)
    this.relationship = new Relationship(context.relationships, this.group)
    this.node = new Node(context.nodes, context.labels!, this.group, this.simulation)

    const zoomHandler = this.zoomHandler()

    this.container.get
      // @ts-ignore
      .call(zoomHandler)
      .call(
        // @ts-ignore
        zoomHandler.transform,
        d3.zoomIdentity
          .translate(this.position.x, this.position.y)
          .scale(this.scale),
      )

    this.onNodeClick(context)

    this.onTick()
  }

  private zoomHandler() {
    return zoom(this.group!)
      .on('zoom', (event) => {
        this.scale = event.transform.k
        this.position = { x: event.transform.x, y: event.transform.y }
        this.group!.get.attr('transform', event.transform)
      })
  }

  private onTick() {
    this.simulation!.get.on('tick', () => {
      this.relationship!
        .get
        .select('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      this.relationship!
        .get
        .select('text')
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      this.node!.get.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
    })
  }

  private onNodeClick(context: Partial<IGraphContext>) {
    const container = this.container
    const zoomHandler = this.zoomHandler()
    const position = this.position
    const scale = this.scale
    const options = this.optionsOpened

    const setOptions = (value: boolean) => {
      this.optionsOpened = value
    }

    const openCloseButtons = (currentNode: d3.Selection<d3.BaseType | SVGGElement, unknown, null, unknown>) => {
      if (options) {
        this.node!.closeButtons(currentNode)
      } else {
        this.node!.openButtons(currentNode)
      }
    }

    this.node!.get.on('click', function (event) {
      const currentNode = d3.select(this)

      switch (context.state!.current) {
        case InteractionState.CREATE_RELATIONSHIP:
          context.setTarget!(currentNode.attr('data-element-id'))
          break
        default:
          if (options) return

          context.state!.current = InteractionState.READ_NODE
          context.clickHandler!({
            nodeId: currentNode.attr('data-element-id'),
          })

          openCloseButtons(currentNode)

          setOptions(!options)
          event.stopPropagation()

          return clickZoom(
            container!.get,
            zoomHandler,
            {
              x: position.x,
              y: position.y,
              scale: scale,
            },
            // @ts-ignore
            { x: currentNode.data()[0].x, y: currentNode.data()[0].y },
          )
      }
    })
  }
}