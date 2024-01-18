import { useEffect, useRef, useState } from 'react'
import { DriverImpl } from '@/data/driver/Driver.impl'
import { Neo4jRepositoryImpl } from '@/data/neo4j/repository/Neo4jRepository.impl'
import {
  Node,
  NodeCreateDTO,
  NodeD3,
  NodeUpdateDTO,
} from '@/domain/neo4j/models/Node'
import {
  Relationship,
  RelationshipCreateDTO,
  RelationshipD3,
} from '@/domain/neo4j/models/Relationship'
import { CreateNodeCaseImpl } from '@/domain/neo4j/usecases/CreateNodeCase'
import { CreateRelationshipCaseImpl } from '@/domain/neo4j/usecases/CreateRelationshipCase'
import { DeleteNodeCaseImpl } from '@/domain/neo4j/usecases/DeleteNodeCase'
import { GetGraphCaseImpl } from '@/domain/neo4j/usecases/GetGraphCase'
import { UpdateNodeCaseImpl } from '@/domain/neo4j/usecases/UpdateNodeCase'
import { InteractionState } from '@/features/graph/constants'
import { IGraphContext } from '@/features/graph/context'
import { DialogType, useDialog } from '@/features/graph/hooks/useDialog'
import { useToast } from '@/ui/Toast/hooks/useToast'

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

const getGraphCase = new GetGraphCaseImpl(repository.getGraph)
const createNodeCase = new CreateNodeCaseImpl(repository.createNode)
const updateNodeCase = new UpdateNodeCaseImpl(repository.updateNode)
const deleteNodeCase = new DeleteNodeCaseImpl(repository.deleteNode)
const createRelationshipCase = new CreateRelationshipCaseImpl(
  repository.createRelationship,
)

const DEFAULT_RELATIONSHIP_TARGETS = { source: '-1', target: '-1' }

export const useGraph = (): IGraphContext => {
  const { add } = useToast()
  const { dialog, dialogType, prevType, setDialogType, setProps } = useDialog()

  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relationships, setRelationships] = useState<RelationshipD3[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })
  const [focusedNode, setFocusedNode] = useState('-1')

  const state = useRef<InteractionState>(InteractionState.DEFAULT)
  const createRelationshipTargets = useRef(DEFAULT_RELATIONSHIP_TARGETS)

  const getNodes = async () => {
    try {
      const { nodes, labels, relationships, types } =
        await getGraphCase.execute()

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

      state.current = InteractionState.DEFAULT
      add('success', 'Node successfully created.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const updateNode = async (
    nodeId: string,
    labels: string[],
    properties: KeyValue,
  ) => {
    try {
      const node = nodes.find((node) => node.elementId === nodeId)!
      const updatedNode = new NodeUpdateDTO(node?.labels, labels, properties)

      const { node: nodeD3, relationships: updatedRelationships } =
        await updateNodeCase.execute(node, updatedNode, relationships)

      const nodeLabels: string[] = []
      nodeD3.labels.forEach((label) => {
        if (!labels.includes(label)) {
          nodeLabels.push(label)
        }
      })

      setNodes([
        ...getNodesWithoutTemplate().filter(
          (node) => node.elementId !== nodeId,
        ),
        nodeD3,
      ])
      setRelationships(updatedRelationships)

      add('success', 'Node successfully updated.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const deleteNode = async () => {
    try {
      await deleteNodeCase.execute(focusedNode)

      setNodes(nodes.filter((node) => node.elementId !== focusedNode))
      setRelationships(
        relationships.filter(
          (relationship) =>
            relationship.endNodeElementId !== focusedNode &&
            relationship.startNodeElementId !== focusedNode,
        ),
      )

      add('success', 'Node successfully deleted.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setDialogType(DialogType.NONE)
    }
  }

  const createRelationship = async (type: string, properties: KeyValue) => {
    try {
      const relationship = new RelationshipCreateDTO(
        createRelationshipTargets.current.source,
        createRelationshipTargets.current.target,
        type,
        properties,
      )

      const relationshipD3 = await createRelationshipCase.execute(relationship)

      setRelationships([...getRelationshipsWithoutTemplate(), relationshipD3])
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

    setDialogType(DialogType.NONE)
    state.current = InteractionState.CREATE_RELATIONSHIP
  }

  const setTarget = (targetId: string) => {
    createRelationshipTargets.current = {
      ...createRelationshipTargets.current,
      target: targetId,
    }

    setDialogType(DialogType.CREATE_RELATIONSHIP)

    return createRelationshipTargets.current.source
  }

  const updateNodeTemplate = (
    labels: string[],
    properties: KeyValue,
    initialNode?: NodeD3,
  ) => {
    const node = new NodeD3(
      new Node('-1', { low: -1, high: -1 }, labels, properties),
      initialNode?.x || addNodePosition.x,
      initialNode?.y || addNodePosition.y,
    )

    setNodes([...getNodesWithoutTemplate(), node])
  }

  const updateRelationshipTemplate = (type: string, properties: KeyValue) => {
    const relationship = new RelationshipD3(
      new Relationship(
        '-1',
        { low: -1, high: -1 },
        { low: -1, high: -1 },
        createRelationshipTargets.current.target,
        { low: -1, high: -1 },
        createRelationshipTargets.current.source,
        properties,
        type || '',
      ),
    )

    setRelationships([...getRelationshipsWithoutTemplate(), relationship])
  }

  const clickHandler = (payload?: any) => {
    switch (state.current) {
      case InteractionState.DELETE_NODE:
        setDialogType(DialogType.DELETE_NODE)
        setFocusedNode(payload?.nodeId)
        break
      case InteractionState.UPDATE_NODE:
        setDialogType(DialogType.UPDATE_NODE)
        const initialNode = nodes.find(
          (node) => node.elementId === payload.nodeId,
        )
        setProps({ initialNode })
        break
      case InteractionState.READ_NODE:
        const nodeId = payload.nodeId
        const node = nodes.find((node) => node.elementId === nodeId)
        setProps({ node })
        setFocusedNode(nodeId)
        setDialogType(DialogType.NODE_DETAILS)
        break
      case InteractionState.READ_RELATIONSHIP:
        const relationshipId = payload.relationshipId
        const relationship = relationships.find(
          (relationship) => relationship.elementId === relationshipId,
        )
        setProps({ relationship })
        setDialogType(DialogType.RELATIONSHIP_DETAILS)
        break
      default:
        setDialogType(DialogType.CREATE_NODE)
        setAddNodePosition({ x: payload.x, y: payload.y })
    }
  }

  useEffect(() => {
    if (dialogType === DialogType.NONE) {
      if (prevType === DialogType.CREATE_RELATIONSHIP) {
        state.current = InteractionState.DEFAULT
        createRelationshipTargets.current = DEFAULT_RELATIONSHIP_TARGETS
        setRelationships(getRelationshipsWithoutTemplate())
      }
      if (prevType === DialogType.CREATE_NODE) {
        setNodes(getNodesWithoutTemplate())
      }
    }
  }, [dialogType])

  const getNodesWithoutTemplate = () =>
    nodes.filter((node) => node.elementId !== '-1')

  const getRelationshipsWithoutTemplate = () =>
    relationships.filter((relationship) => relationship.elementId !== '-1')

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
    updateNode,
    deleteNode,
    createRelationship,
    setSource,
    setTarget,
    updateNodeTemplate,
    updateRelationshipTemplate,
    clickHandler,
  }
}
