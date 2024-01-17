import {RefObject, useCallback, useEffect, useRef, useState} from 'react'
import {useGraphContext} from '@/features/graph/context'
import {clickZoom, zoom} from '@/features/graph/helpers/zoom'
import {InteractionState} from '@/features/graph/constants'
import * as d3 from 'd3'
import {Container} from "@/features/graph/hooks/graphRender/classes/Container";
import {Simulation} from "@/features/graph/hooks/graphRender/classes/Simulation";
import {Group} from "@/features/graph/hooks/graphRender/classes/Group";
import {Node} from "@/features/graph/hooks/graphRender/classes/Node";
import {Relationship} from  "@/features/graph/hooks/graphRender/classes/Relationship";


export const useGraphRender = (svg: RefObject<SVGSVGElement>) => {
  const {
    nodes,
    relationships,
    labels,
    clickHandler,
    setSource,
    setTarget,
    state,
  } = useGraphContext()

  const scale = useRef(1)
  const position = useRef({ x: 0, y: 0 })
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 })
  const [isAnimation, setIsAnimation] = useState(false)
  const optionsOpened = useRef(false)

  const render = useCallback(() => {
    if (!nodes || !relationships) {
      return
    }

    const container = new Container(svg)
    const simulation = new Simulation(nodes, relationships)
    const group = new Group(container)
    const relationship = new Relationship(relationships, group)
    const node = new Node(nodes, labels, group, simulation)

    node.get.on('click', function (event) {
      const currentNode = d3.select(this)

      switch (state.current) {
        case InteractionState.CREATE_RELATIONSHIP:
          setTarget(currentNode.attr('data-element-id'))
          break
        default:
          if (optionsOpened.current) return

          state.current = InteractionState.READ_NODE
          clickHandler({
            nodeId: currentNode.attr('data-element-id'),
          })

          if (optionsOpened.current) {
            node.closeButtons(currentNode)
          } else {
            node.openButtons(currentNode)
          }

          optionsOpened.current = !optionsOpened.current
          event.stopPropagation()

          return clickZoom(
            container.get,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            // @ts-ignore
            { x: currentNode.data()[0].x, y: currentNode.data()[0].y },
          )
      }
    })

    relationship.get.on('click', function () {
      const currentRelationship = d3.select(this)

      state.current = InteractionState.READ_RELATIONSHIP
      clickHandler({
        relationshipId: currentRelationship?.attr('data-element-id'),
      })

      // @ts-ignore
      const source = currentRelationship.data()[0].source
      // @ts-ignore
      const target = currentRelationship.data()[0].target

      return clickZoom(
        container.get,
        zoomHandler,
        { x: position.current.x, y: position.current.y, scale: scale.current },
        { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 },
      )
    })

    node.deleteButton.get.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.DELETE_NODE
      clickHandler({ nodeId })
      node.closeButtons()

      optionsOpened.current = false
    })

    node.relationshipButton.get.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      setSource(nodeId)
      node.closeButtons()

      optionsOpened.current = false
    })

    node.editButton.get.on('click', function (event) {
      event.stopPropagation()

      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.UPDATE_NODE
      clickHandler({ nodeId })

      node.closeButtons()

      optionsOpened.current = false
    })

    node.get.on('mouseover', function () {
      d3
        .select(this)
        .attr('cursor', 'pointer')
        .select('.node-circle')
        .attr('stroke-width', 5)
        .style("stroke-opacity", .8)
    })

    node.get.on('mouseleave', function () {
      d3
        .select(this)
        .select('.node-circle')
        .attr('stroke-width', 1.5)
        .style("stroke-opacity", 1)
    })

    // @ts-ignore
    const zoomHandler = zoom(group).on('zoom', (event) => {
      scale.current = event.transform.k
      position.current = { x: event.transform.x, y: event.transform.y }
      group.get.attr('transform', event.transform)
    })

    container.get
      // @ts-ignore
      .call(zoomHandler)
      .call(
        // @ts-ignore
        zoomHandler.transform,
        d3.zoomIdentity
          .translate(position.current.x, position.current.y)
          .scale(scale.current),
      )

    container.get.on('click', (event) => {
      const target = event.target as HTMLElement

      switch (target.tagName.toLowerCase()) {
        case 'svg':
          const handler = (x: number, y: number) => {
            clickHandler({ x, y })
            setClickedPosition({ x, y })
            setIsAnimation(true)
          }

          state.current = InteractionState.CREATE_NODE

          if (!isAnimation) {
            setTimeout(() => {
              svg.current?.dispatchEvent(
                new MouseEvent('click', { bubbles: false }),
              )
            }, 100)
          }

          let x = clickedPosition.x
          let y = clickedPosition.y

          return clickZoom(
            container.get,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            { x: x || d3.pointer(event)[0], y: y || d3.pointer(event)[1] },
            handler,
            {
              animation: isAnimation,
              finishAnimation: () => {
                setIsAnimation(false)
                setClickedPosition({ x: 0, y: 0 })
              },
            },
          )
      }

      if (optionsOpened.current) {
        node.closeButtons()

        optionsOpened.current = false
      }
    })

    simulation.get.on('tick', () => {
      relationship
        .get
        .select('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      relationship
        .get
        .select('text')
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      node.get.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
    })

    return simulation
  }, [nodes, relationships])

  useEffect(() => {
    render()
  }, [nodes, relationships])
}
