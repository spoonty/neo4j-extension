import * as d3 from 'd3'
import { BaseType } from 'd3-selection'

export abstract class Selection<
  GElement extends BaseType,
  Datum,
  PElement extends BaseType,
  PDatum,
> {
  protected constructor(
    protected readonly selection: d3.Selection<
      GElement,
      Datum,
      PElement,
      PDatum
    >,
  ) {}

  public get get() {
    return this.selection
  }
}
