export class Node {
  constructor(
    readonly elementId: string,
    readonly identity: { low: number; high: number },
    readonly labels: Array<string>,
    readonly properties: KeyValue,
  ) {}
}

export class NodeCreateDTO {
  constructor(
    readonly labels: Array<string>,
    readonly properties: KeyValue,
  ) {}
}

export class NodeUpdateDTO {
  constructor(
    readonly labels: Array<string>,
    readonly newLabels: Array<string>,
    readonly properties: KeyValue,
  ) {}
}

export class NodeD3 extends Node {
  constructor(
    node: Node,
    public x: number = 0,
    public y: number = 0,
    public fx?: number | null,
    public fy?: number | null,
  ) {
    Object.keys(node.properties).forEach((key) => {
      node.properties[key] = node.properties[key].low || node.properties[key]
    })

    super(node.elementId, node.identity, node.labels, node.properties)
  }

  setPosition = (x: number, y: number) => {
    this.x = x
    this.y = y
  }
}
