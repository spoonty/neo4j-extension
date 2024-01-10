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

export const useGraph = (): IGraphContext => {
  const { add } = useToast()

  const { dialog, setType } = useDialog()

  const state = useRef<InteractionState>(InteractionState.DEFAULT)

  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relations, setRelations] = useState<RelationshipD3[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })
  const createRelationTargets = useRef<{
    source: string | null
    target: string | null
  }>({
    source: null,
    target: null,
  })

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

  const createNode = async (node: NodeCreateDTO) => {
    try {
      const nodeD3 = await createNodeCase.execute(node)
      nodeD3.setPosition(addNodePosition.x, addNodePosition.y)

      const nodeLabels: string[] = []
      nodeD3.labels.forEach((label) => {
        if (!labels.includes(label)) {
          nodeLabels.push(label)
        }
      })

      setNodes([...nodes.slice(0, nodes.length - 1), nodeD3])
      setLabels([...labels, ...nodeLabels])

      add('success', 'Node successfully created.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setType(DialogType.NONE)
    }
  }

  const deleteNode = async (nodeId: string) => {
    try {
      await deleteNodeCase.execute(nodeId)

      setNodes(nodes.filter((node) => node.elementId !== nodeId))
      setRelations(relations.filter((relation) => relation.endNodeElementId !== nodeId && relation.startNodeElementId !== nodeId))

      add('success', 'Node successfully deleted.')
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setType(DialogType.NONE)
    }
  }

  const createRelation = async (relation: RelationshipCreateDTO) => {
    try {
      const relationshipD3 = await createRelationshipCase.execute(relation)

      setRelations([...relations, relationshipD3])
      add('success', 'Relationship successfully created.')

      createRelationTargets.current = {
        source: null,
        target: null,
      }
    } catch (error: any) {
      add('error', error.message)
    } finally {
      setType(DialogType.NONE)
    }
  }

  const setSource = (sourceId: string) => {
    createRelationTargets.current = {
      source: sourceId,
      target: null,
    }
    state.current = InteractionState.CREATE_RELATION
  }

  const setTarget = (targetId: string) => {
    createRelationTargets.current = {
      ...createRelationTargets.current,
      target: targetId,
    }

    setType(DialogType.CREATE_RELATIONSHIP)
  }

  const updateNodeTemplate = (labels: string[], properties: KeyValue) => {
    const node = new NodeD3(
      new Node('-1', { low: -1, high: -1 }, labels, properties),
      addNodePosition.x,
      addNodePosition.y,
    )

    if (!!getTemplateNode()) {
      setNodes([...nodes.slice(0, nodes.length - 1), node])
    } else {
      setNodes([...nodes, node])
    }
  }

  const removeNodeTemplate = () => {
    setNodes(nodes)
  }

  const clickHandler = <T>(payload?: T) => {
    switch (state.current) {
      case InteractionState.DELETE_NODE:
        setType(DialogType.DELETE_NODE)
        break
      default:
        setType(DialogType.CREATE_NODE)
        // @ts-ignore
        setAddNodePosition({ x: payload.x, y: payload.y })
    }
  }

  const closeCreateRelationDialog = () => {
    createRelationTargets.current = {
      source: null,
      target: null
    }
    state.current = InteractionState.DEFAULT
  }

  const getTemplateNode = () => nodes?.find((node) => node.elementId === '-1')

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
    createRelationTargets: createRelationTargets.current,
    createNode,
    deleteNode,
    createRelation,
    setSource,
    setTarget,
    updateNodeTemplate,
    removeNodeTemplate,
    clickHandler,
  }
}
