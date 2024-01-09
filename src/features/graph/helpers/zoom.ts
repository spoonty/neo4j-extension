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
  zoomHandler: d3.ZoomBehavior<Element, unknown>,
  xCurrent: number,
  yCurrent: number,
  scaleCurrent: number,
  xClicked?: number,
  yClicked?: number,
  isAnimation?: boolean,
  setIsAnimation?: (value: boolean) => void,
  clickHandler?: (x: number, y: number) => void,
  setClickedPosition?: ({ x, y }: { x: number; y: number }) => void,
) => {
  const scaleFactor = 3
  let x, y, distanceX, distanceY, deltaX = 0, deltaY = 0

  if (clickHandler && setClickedPosition && setIsAnimation && !isAnimation) {
    [x, y] = d3.pointer(event)

    distanceX = (x - xCurrent) / scaleCurrent
    distanceY = (y - yCurrent) / scaleCurrent

    clickHandler?.(distanceX, distanceY)

    setClickedPosition({ x: distanceX, y: distanceY })
    setIsAnimation(true)
    return
  }

  if (!clickHandler && !!xClicked && !!yClicked) {
    distanceX = (xClicked - xCurrent) / scaleCurrent
    distanceY = (yClicked - yCurrent) / scaleCurrent

    deltaX = -window.innerWidth / (4 * scaleFactor) - distanceX
    deltaY = -distanceY
  }

  if (clickHandler && !!xClicked && !!yClicked) {
    deltaX = -window.innerWidth / (4 * scaleFactor) - xClicked
    deltaY = -yClicked
  }

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

  if (setIsAnimation) {
    setIsAnimation(false)
  }
}
