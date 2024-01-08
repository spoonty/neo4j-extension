export class Relation {
  constructor(
    readonly elementId: string,
    readonly end: { low: number; high: number },
    readonly endNodeElementId: string,
    readonly start: { low: number; high: number },
    readonly startNodeElementId: string,
    readonly properties: KeyValue,
    readonly type: ValueOrNull<string>,
  ) {}
}

export class RelationCreateDTO {
  constructor(
    readonly startNodeElementId: string,
    readonly endNodeElementId: string,
    readonly type: string,
    readonly properties: KeyValue,
  ) {}
}

export class RelationD3 extends Relation {
  source: string
  target: string

  constructor(relation: Relation) {
    super(
      relation.elementId,
      relation.end,
      relation.endNodeElementId,
      relation.start,
      relation.startNodeElementId,
      relation.properties,
      relation.type,
    )

    this.source = relation.startNodeElementId
    this.target = relation.endNodeElementId
  }
}
