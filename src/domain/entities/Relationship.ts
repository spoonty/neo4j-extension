export class Relationship {
  constructor(
    readonly elementId: string,
    readonly identity: { low: number; high: number },
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

export class RelationshipUpdateDTO {
  constructor(
    readonly type: string,
    readonly properties: KeyValue,
  ) {}
}

export class RelationshipD3 extends Relationship {
  source: string
  target: string

  constructor(relationship: Relationship) {
    Object.keys(relationship.properties).forEach((key) => {
      relationship.properties[key] =
        relationship.properties[key].low || relationship.properties[key]
    })

    super(
      relationship.elementId,
      relationship.identity,
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
