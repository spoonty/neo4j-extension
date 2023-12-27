export class Node {
    constructor(
        readonly elementId: string,
        readonly identity: { low: number, high: number },
        readonly labels: Array<string>,
        readonly properties: KeyValue
    ) {}
}