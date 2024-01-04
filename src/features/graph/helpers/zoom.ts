import * as d3 from 'd3'

export const zoom = (
  selection: d3.Selection<SVGSVGElement, unknown, SVGSVGElement, unknown>,
) => {
  const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    // @ts-ignore
    selection.attr('transform', event.transform)
  }

  return d3.zoom().scaleExtent([0.1, 10]).on('zoom', zoomed)
}
