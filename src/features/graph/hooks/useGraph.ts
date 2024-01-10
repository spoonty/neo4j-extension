import {useEffect, useRef, useState} from 'react'
import {DriverImpl} from '@/data/driver/Driver.impl'
import {Neo4jRepositoryImpl} from '@/data/neo4j/repository/Neo4jRepository.impl'
import {Node, NodeCreateDTO, NodeD3} from '@/domain/neo4j/models/Node'
import {RelationshipCreateDTO, RelationshipD3,} from '@/domain/neo4j/models/Relationship'
import {IGraphContext} from '@/features/graph/context'
import {useToast} from '@/ui/Toast/hooks/useToast'
import {GetGraphCaseImpl} from "@/domain/neo4j/usecases/GetGraphCase";
import {CreateNodeCaseImpl} from "@/domain/neo4j/usecases/CreateNodeCase";
import {DeleteNodeCaseImpl} from "@/domain/neo4j/usecases/DeleteNodeCase";
import {CreateRelationshipCaseImpl} from "@/domain/neo4j/usecases/CreateRelationshipCase";
import {DialogType, useDialog} from "@/features/graph/hooks/useDialog";

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

const getGraphCase = new GetGraphCaseImpl(repository.getGraph)
const createNodeCase = new CreateNodeCaseImpl(repository.createNode)
const deleteNodeCase = new DeleteNodeCaseImpl(repository.deleteNode)
const createRelationshipCase = new CreateRelationshipCaseImpl(repository.createRelation)

export enum InteractionState {
  DEFAULT,
  CREATE_NODE,
  DELETE_NODE,
  CREATE_RELATION,
}

const DEFAULT_RELATIONSHIP_TARGETS = { source: '-1', target: '-1' }

export const useGraph = (): IGraphContext => {
  const { add } = useToast()
  const { dialog, dialogType, setDialogType } = useDialog()

  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relations, setRelations] = useState<RelationshipD3[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })
  const [nodeDelete, setNodeDelete] = useState('-1')

  const state = useRef<InteractionState>(InteractionState.DEFAULT)
  const createRelationTargets = useRef(DEFAULT_RELATIONSHIP_TARGETS)

  const getNodes = async () => {
    try {
      const { nodes, labels, relationships, types } = await getGraphCase.execute()

      setNodes(nodes)
      setLabels(labels)

      setRelations(relationships)
      setTypes(types)
    } catch (error: any) {
      add('error', error.message)
    }
  }

  const createNode = async (labels: string[], properties: KeyValue) => {
    try {
      const node = new NodeCreateDTO(labels, properties)

      const nodeD3 = await createNodeCase.execute(node)
      nodeD3.setPosition(addNodePosition.x, addNodePosition.y)

      const nodeLabels: string[] = []
      nodeD3.labels.forEach((label) => {
        if (!labels.includes(label)) {
          nodeLabels.push(label)
        }
      })

      setNodes([...getNodesWithoutTemplate(), nodeD3])
      setLabels([...labels, ...nodeLabels])

      add('success', 'Node successfully created.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const deleteNode = async () => {
    try {
      await deleteNodeCase.execute(nodeDelete)

      setNodes(nodes.filter((node) => node.elementId !== nodeDelete))
      setRelations(relations.filter((relation) => relation.endNodeElementId !== nodeDelete && relation.startNodeElementId !== nodeDelete))

      add('success', 'Node successfully deleted.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const createRelation = async (type: string, properties: KeyValue) => {
    try {
      const relationship = new RelationshipCreateDTO(createRelationTargets.current.source, createRelationTargets.current.target, type, properties)

      const relationshipD3 = await createRelationshipCase.execute(relationship)

      setRelations([...relations, relationshipD3])
      add('success', 'Relationship successfully created.')

      createRelationTargets.current = DEFAULT_RELATIONSHIP_TARGETS
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const setSource = (sourceId: string) => {
    createRelationTargets.current = {
      ...createRelationTargets.current,
      source: sourceId,
    }

    state.current = InteractionState.CREATE_RELATION
  }

  const setTarget = (targetId: string) => {
    createRelationTargets.current = {
      ...createRelationTargets.current,
      target: targetId,
    }

    setDialogType(DialogType.CREATE_RELATIONSHIP)
  }

  const updateNodeTemplate = (labels: string[], properties: KeyValue) => {
    const node = new NodeD3(
      new Node('-1', { low: -1, high: -1 }, labels, properties),
      addNodePosition.x,
      addNodePosition.y,
    )

    setNodes([...getNodesWithoutTemplate(), node])
  }

  const clickHandler = <T>(payload?: T) => {
    switch (state.current) {
      case InteractionState.DELETE_NODE:
        setDialogType(DialogType.DELETE_NODE)
        // @ts-ignore
        setNodeDelete(payload?.nodeId)
        break
      default:
        setDialogType(DialogType.CREATE_NODE)
        // @ts-ignore
        setAddNodePosition({ x: payload.x, y: payload.y })
    }
  }

  useEffect(() => {
    if (dialogType === DialogType.NONE) {
      createRelationTargets.current = DEFAULT_RELATIONSHIP_TARGETS
      state.current = InteractionState.DEFAULT
      setNodes(getNodesWithoutTemplate())
    }
  }, [dialogType]);

  const getNodesWithoutTemplate = () => nodes.filter((node) => node.elementId !== '-1')

  useEffect(() => {
    getNodes()
  }, [])

  return {
    dialog,
    state,
    nodes,
    relations,
    labels,
    types,
    createNode,
    deleteNode,
    createRelation,
    setSource,
    setTarget,
    updateNodeTemplate,
    clickHandler,
  }
}
