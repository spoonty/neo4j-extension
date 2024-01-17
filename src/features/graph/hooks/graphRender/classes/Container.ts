import * as d3 from "d3";
import {RefObject} from "react";

export class Container {
  private readonly container: d3.Selection<SVGSVGElement | null, unknown, null, undefined>

  constructor(svg: RefObject<SVGSVGElement>) {
    this.container = d3
      .select(svg.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [
        -window.innerWidth / 2,
        -window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight,
      ])
      .attr('style', 'max-width: 100%; height: auto;')

    this.container.selectAll('*').remove()
  }

  public get get() {
    return this.container
  }
}