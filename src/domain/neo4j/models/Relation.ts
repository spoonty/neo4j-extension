export class Relation {
    constructor(
        readonly elementId: string,
        readonly end: { low: number, high: number },
        readonly endNodeElementId: string,
        readonly start: { low: number, high: number },
        readonly startNodeElementId: string,
        readonly properties: KeyValue,
        readonly type: ValueOrNull<string>,
    ) {}
}