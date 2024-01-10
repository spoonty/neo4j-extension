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
const createRelationshipCase = new CreateRelationshipCaseImpl(repository.createRelationship)

export enum InteractionState {
  DEFAULT,
  CREATE_NODE,
  DELETE_NODE,
  CREATE_RELATIONSHIP,
}

const DEFAULT_RELATIONSHIP_TARGETS = { source: '-1', target: '-1' }

export const useGraph = (): IGraphContext => {
  const { add } = useToast()
  const { dialog, dialogType, setDialogType } = useDialog()

  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relationships, setRelationships] = useState<RelationshipD3[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })
  const [nodeDelete, setNodeDelete] = useState('-1')

  const state = useRef<InteractionState>(InteractionState.DEFAULT)
  const createRelationshipTargets = useRef(DEFAULT_RELATIONSHIP_TARGETS)

  const getNodes = async () => {
    try {
      const { nodes, labels, relationships, types } = await getGraphCase.execute()

      setNodes(nodes)
      setLabels(labels)

      setRelationships(relationships)
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
      setRelationships(relationships.filter((relationship) => relationship.endNodeElementId !== nodeDelete && relationship.startNodeElementId !== nodeDelete))

      add('success', 'Node successfully deleted.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const createRelationship = async (type: string, properties: KeyValue) => {
    try {
      const relationship = new RelationshipCreateDTO(createRelationshipTargets.current.source, createRelationshipTargets.current.target, type, properties)

      const relationshipD3 = await createRelationshipCase.execute(relationship)

      setRelationships([...relationships, relationshipD3])
      add('success', 'Relationship successfully created.')

      createRelationshipTargets.current = DEFAULT_RELATIONSHIP_TARGETS
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const setSource = (sourceId: string) => {
    createRelationshipTargets.current = {
      ...createRelationshipTargets.current,
      source: sourceId,
    }

    state.current = InteractionState.CREATE_RELATIONSHIP
  }

  const setTarget = (targetId: string) => {
    createRelationshipTargets.current = {
      ...createRelationshipTargets.current,
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
      createRelationshipTargets.current = DEFAULT_RELATIONSHIP_TARGETS
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
    relationships,
    labels,
    types,
    createNode,
    deleteNode,
    createRelationship,
    setSource,
    setTarget,
    updateNodeTemplate,
    clickHandler,
  }
}
