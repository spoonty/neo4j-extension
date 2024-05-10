import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { storageImpl } from '@/data/services/Storage.impl'
import { Container } from '@/features/graph/classes/Container'
import { Group } from '@/features/graph/classes/Group'
import { Node } from '@/features/graph/classes/Node'
import { Relationship } from '@/features/graph/classes/Relationship'
import { Simulation } from '@/features/graph/classes/Simulation'
import { InteractionState } from '@/features/graph/constants'
import { useGraphContext } from '@/features/graph/context'
import { clickZoom, zoom } from '@/features/graph/helpers/zoom'
import { useSessionContext } from '@/features/session/context'
import { Connection } from '@/features/session/static/const'
import { localStorageKeys } from '@/features/session/static/keys'
import * as d3 from 'd3'

export const useRender = (svg: RefObject<SVGSVGElement>) => {
  const {
    nodes,
    relationships,
    clickHandler,
    setSource,
    setTarget,
    state,
    deleteRelationship,
    page,
    mode,
    graphSize,
  } = useGraphContext()

  const { connection } = useSessionContext()

  const [node, setNode] = useState<Node>()
  const [relationship, setRelationship] = useState<Relationship>()

  const rendered = useRef(false)
  const scale = useRef(1)
  const position = useRef({ x: 0, y: 0 })
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 })
  const isAnimation = useRef(false)
  const optionsOpened = useRef(false)

  const render = useCallback(() => {
    const fullConnection = connection === Connection.FULL

    const container = new Container(svg)
    const simulation = new Simulation(nodes, relationships, rendered.current)
    const group = new Group(container)
    const relationship = new Relationship(relationships, group, fullConnection)
    const node = new Node(nodes, group, simulation, fullConnection)

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

    onNodeClick(node, container, zoomHandler)
    onRelationshipClick(relationship, container, zoomHandler)

    if (fullConnection) {
      onNodeDeleteButtonClick(node)
      onNodeRelationshipButtonClick(node, container, zoomHandler)
      onNodeEditButtonClick(node)

      onRelationshipEditButtonClick(relationship)
      onRelationshipDeleteButtonClick(relationship)

      onContainerClick(container, node, zoomHandler)
    }

    onTick(simulation, node, relationship)

    setNode(node)
    setRelationship(relationship)

    if (!nodes || !nodes.length) {
      return
    }
    if (!rendered.current) {
      rendered.current = true
    }
  }, [nodes, relationships])

  const onTick = (
    simulation: Simulation,
    node: Node,
    relationship: Relationship,
  ) => {
    simulation.get.on('tick', () => {
      relationship.get
        .select('line')
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      relationship.get
        .select('text')
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2)

      node.get.attr(
        'transform',
        (d: any) => 'translate(' + d.x + ',' + d.y + ')',
      )
    })
  }

  const onContainerClick = (
    container: Container,
    node: Node,
    zoomHandler: d3.ZoomBehavior<Element, unknown>,
  ) => {
    container.get.on('click', (event) => {
      if (
        state.current === InteractionState.READ_NODE ||
        state.current === InteractionState.READ_RELATIONSHIP
      )
        return

      const target = event.target as HTMLElement
      switch (target.tagName.toLowerCase()) {
        case 'svg':
          const handler = (x: number, y: number) => {
            clickHandler({ x, y })
            setClickedPosition({ x, y })
            isAnimation.current = true
          }

          state.current = InteractionState.CREATE_NODE

          if (!isAnimation.current) {
            setTimeout(() => {
              target.dispatchEvent(new MouseEvent('click', { bubbles: false }))
            }, 100)
          }

          let x = clickedPosition.x
          let y = clickedPosition.y

          return clickZoom(
            container,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            { x: x || d3.pointer(event)[0], y: y || d3.pointer(event)[1] },
            handler,
            {
              animation: isAnimation.current,
              finishAnimation: () => {
                isAnimation.current = false
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
  }

  const onNodeClick = (
    node: Node,
    container: Container,
    zoomHandler: d3.ZoomBehavior<Element, unknown>,
  ) => {
    node.get.on('click', function (event) {
      const currentNode = d3.select(this)

      switch (state.current) {
        case InteractionState.CREATE_RELATIONSHIP:
          setTarget(currentNode.attr('data-element-id'))
          break
        // const source = d3.selectAll('g').filter(function (d: any) {
        //   return d3.select(this).attr('data-element-id') === sourceId
        // })
        // const sourcePosition = {
        //   x: (source.data()[0] as { x: number }).x,
        //   y: (source.data()[0] as { y: number }).y,
        // }
        //
        // if (!isAnimation.current) {
        //   setTimeout(() => {
        //     currentNode.dispatch('click')
        //   }, 100)
        //   isAnimation.current = true
        //   return
        // }
        //
        // svg.current?.dispatchEvent(
        //   new MouseEvent('click', { bubbles: false }),
        // )
        //
        // return clickZoom(
        //   container,
        //   zoomHandler,
        //   {
        //     x: position.current.x,
        //     y: position.current.y,
        //     scale: scale.current,
        //   },
        //   {
        //     x:
        //       (sourcePosition.x +
        //         (currentNode.data()[0] as { x: number }).x) /
        //       2,
        //     y:
        //       (sourcePosition.y +
        //         (currentNode.data()[0] as { y: number }).y) /
        //       2,
        //   },
        //   undefined,
        //   {
        //     animation: isAnimation.current,
        //     finishAnimation: () => {
        //       isAnimation.current = false
        //     },
        //   },
        // )
        default:
          if (optionsOpened.current) return

          const nodeId = currentNode.attr('data-element-id')

          state.current = InteractionState.READ_NODE
          clickHandler({
            nodeId,
          })

          if (optionsOpened.current) {
            node.closeButtons(currentNode)
          } else {
            node.openButtons(currentNode)
          }

          d3.selectAll('g')
            .filter(function () {
              return (
                !!d3.select(this).attr('data-element-id') &&
                d3.select(this).attr('data-element-id') !== nodeId
              )
            })
            .attr('pointer-events', 'none')

          optionsOpened.current = !optionsOpened.current
          event.stopPropagation()

          return clickZoom(
            container,
            zoomHandler,
            {
              x: position.current.x,
              y: position.current.y,
              scale: scale.current,
            },
            {
              x: (currentNode.data()[0] as { x: number }).x,
              y: (currentNode.data()[0] as { y: number }).y,
            },
          )
      }
    })
  }

  const onRelationshipClick = (
    relationship: Relationship,
    container: Container,
    zoomHandler: d3.ZoomBehavior<Element, unknown>,
  ) => {
    relationship.get.on('click', function () {
      const currentRelationship = d3.select(this)

      const relationshipId = currentRelationship?.attr('data-element-id')

      state.current = InteractionState.READ_RELATIONSHIP
      clickHandler({
        relationshipId,
      })

      optionsOpened.current = true

      d3.selectAll('g')
        .filter(function () {
          return (
            !!d3.select(this).attr('data-element-id') &&
            d3.select(this).attr('data-element-id') !== relationshipId
          )
        })
        .attr('pointer-events', 'none')

      const source = (
        currentRelationship.data()[0] as { source: { x: number; y: number } }
      ).source
      const target = (
        currentRelationship.data()[0] as { target: { x: number; y: number } }
      ).target

      relationship.openButtons(currentRelationship)

      return clickZoom(
        container,
        zoomHandler,
        { x: position.current.x, y: position.current.y, scale: scale.current },
        { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 },
      )
    })
  }

  const onNodeDeleteButtonClick = (node: Node) => {
    node.deleteButton?.get.on('click', function (event) {
      event.stopPropagation()

      d3.selectAll('g').attr('pointer-events', 'all')

      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.DELETE_NODE
      clickHandler({ nodeId })
      node.closeButtons()

      optionsOpened.current = false
    })
  }

  const onNodeRelationshipButtonClick = (
    node: Node,
    container: Container,
    zoomHandler: d3.ZoomBehavior<Element, unknown>,
  ) => {
    node.relationshipButton?.get.on('click', function (event) {
      event.stopPropagation()

      d3.selectAll('g').attr('pointer-events', 'all')

      const currentNode = d3.select(this)
      const nodeId = currentNode.attr('data-element-id')
      setSource(nodeId)
      node.closeButtons()

      optionsOpened.current = false

      clickZoom(
        container,
        zoomHandler,
        { x: position.current.x, y: position.current.y, scale: scale.current },
        {
          x: (currentNode.data()[0] as { x: number }).x,
          y: (currentNode.data()[0] as { y: number }).y,
        },
        undefined,
        undefined,
        1,
      )
    })
  }

  const onNodeEditButtonClick = (node: Node) => {
    node.editButton?.get.on('click', function (event) {
      event.stopPropagation()

      d3.selectAll('g').attr('pointer-events', 'all')

      const nodeId = d3.select(this).attr('data-element-id')
      state.current = InteractionState.UPDATE_NODE
      clickHandler({ nodeId })

      node.closeButtons()

      optionsOpened.current = false
    })
  }

  const onRelationshipEditButtonClick = (relationship: Relationship) => {
    relationship.editButton?.get.on('click', function (event) {
      event.stopPropagation()

      d3.selectAll('g').attr('pointer-events', 'all')

      const currentRelationship = d3.select(this)

      const relationshipId = currentRelationship.attr('data-element-id')
      state.current = InteractionState.UPDATE_RELATIONSHIP

      clickHandler({ relationshipId })

      relationship.closeButtons()

      optionsOpened.current = false
    })
  }

  const onRelationshipDeleteButtonClick = (relationship: Relationship) => {
    relationship.deleteButton?.get.on('click', async function (event) {
      event.stopPropagation()

      d3.selectAll('g').attr('pointer-events', 'all')

      const relationshipId = d3.select(this).attr('data-element-id')
      await deleteRelationship(relationshipId)

      relationship.closeButtons()

      optionsOpened.current = false
    })
  }

  useEffect(() => {
    if (
      ![
        InteractionState.READ_NODE,
        InteractionState.READ_RELATIONSHIP,
      ].includes(state.current) &&
      optionsOpened.current
    ) {
      node?.closeButtons()
      relationship?.closeButtons()
      optionsOpened.current = false
      d3.selectAll('g').attr('pointer-events', 'all')
    }
  }, [state.current])

  useEffect(() => {
    render()
  }, [nodes, relationships])

  useLayoutEffect(() => {
    rendered.current = false
  }, [page, mode])
}
