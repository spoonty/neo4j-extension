export class Node {
    constructor(
        readonly elementId: string,
        readonly identity: { low: number, high: number },
        readonly labels: Array<string>,
        readonly properties: KeyValue
    ) {}
}

export class NodeD3 extends Node {
    constructor(
      node: Node,
      public x?: number,
      public y?: number,
      public fx?: number | null,
      public fy?: number | null
    ) {
        super(node.elementId, node.identity, node.labels, node.properties)
    }
}