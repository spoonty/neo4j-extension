export class Relationship {
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

export class RelationshipCreateDTO {
  constructor(
    readonly startNodeElementId: string,
    readonly endNodeElementId: string,
    readonly type: string,
    readonly properties: KeyValue,
  ) {}
}

export class RelationshipD3 extends Relationship {
  source: string
  target: string

  constructor(relationship: Relationship) {
    super(
      relationship.elementId,
      relationship.end,
      relationship.endNodeElementId,
      relationship.start,
      relationship.startNodeElementId,
      relationship.properties,
      relationship.type,
    )

    this.source = relationship.startNodeElementId
    this.target = relationship.endNodeElementId
  }
}
