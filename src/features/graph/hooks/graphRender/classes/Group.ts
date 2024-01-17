import * as d3 from "d3";
import {Container} from "@/features/graph/hooks/graphRender/classes/Container";

export class Group {
  private readonly group: d3.Selection<SVGGElement, unknown, null, undefined>

  constructor(container: Container) {
    this.group = container.get.append('g')
  }

  public get get() {
    return this.group
  }
}