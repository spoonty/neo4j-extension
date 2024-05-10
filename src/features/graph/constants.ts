export enum InteractionState {
  DEFAULT = 'default',
  CREATE_NODE = 'create node',
  READ_NODE = 'read node',
  UPDATE_NODE = 'update node',
  DELETE_NODE = 'delete node',
  CREATE_RELATIONSHIP = 'create relationship',
  READ_RELATIONSHIP = 'read relationship',
  UPDATE_RELATIONSHIP = 'update relationship',
}

export enum Mode {
  FULL_GRAPH,
  FILTERED_GRAPH,
}
