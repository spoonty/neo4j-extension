import * as d3 from 'd3'

export const zoom = (
  selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
) => {
  const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    // @ts-ignore
    selection.attr('transform', event.transform)
  }

  return d3.zoom().scaleExtent([0.5, 5]).on('zoom', zoomed)
}

export const clickZoom = (
  event: any,
  selection: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  isAnimation: boolean,
  setIsAnimation: (value: boolean) => void,
  xCurrent: number,
  yCurrent: number,
  scaleCurrent: number,
  xClicked: number,
  yClicked: number,
  clickHandler: (x: number, y: number) => void,
  setClickedPosition: ({ x, y }: { x: number; y: number }) => void,
  zoomHandler: d3.ZoomBehavior<Element, unknown>,
) => {
  if (!isAnimation) {
    const [x, y] = d3.pointer(event)

    const distanceX = (x - xCurrent) / scaleCurrent
    const distanceY = (y - yCurrent) / scaleCurrent

    clickHandler?.(distanceX, distanceY)

    setClickedPosition({ x: distanceX, y: distanceY })
    setIsAnimation(true)
    return
  }

  const scaleFactor = 3

  const deltaX = -window.innerWidth / (4 * scaleFactor) - xClicked
  const deltaY = -yClicked

  selection
    .transition()
    .duration(500)
    .call(
      //@ts-ignore
      zoomHandler.transform,
      d3.zoomIdentity
        .translate(deltaX * scaleFactor, deltaY * scaleFactor)
        .scale(scaleFactor),
    )

  setIsAnimation(false)
}
