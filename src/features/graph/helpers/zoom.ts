import { Container } from '@/features/graph/hooks/graphRender/classes/Container'
import { Group } from '@/features/graph/hooks/graphRender/classes/Group'
import * as d3 from 'd3'

export const zoom = (group: Group) => {
  const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    // @ts-ignore
    group.get.attr('transform', event.transform)
  }

  return d3.zoom().scaleExtent([0.3, 5]).on('zoom', zoomed)
}

export const clickZoom = (
  selection: Container,
  zoomHandler: d3.ZoomBehavior<Element, unknown>,
  posCurrent: { x: number; y: number; scale: number },
  posClicked: { x: number; y: number },
  handler?: (x: number, y: number) => void,
  animation?: { animation: boolean; finishAnimation: () => void },
) => {
  const distanceX = (posClicked.x - posCurrent.x) / posCurrent.scale
  const distanceY = (posClicked.y - posCurrent.y) / posCurrent.scale

  if (!!handler && animation && !animation?.animation) {
    handler?.(distanceX, distanceY)
    return
  }

  const scaleFactor = 3
  const deltaX = -window.innerWidth / (4 * scaleFactor) - posClicked.x
  const deltaY = -posClicked.y

  selection.get
    .transition()
    .duration(500)
    .call(
      //@ts-ignore
      zoomHandler.transform,
      d3.zoomIdentity
        .translate(deltaX * scaleFactor, deltaY * scaleFactor)
        .scale(scaleFactor),
    )

  animation?.finishAnimation()
}
