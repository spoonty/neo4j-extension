import {useEffect, useRef, useState} from 'react'
import {Node, NodeCreateDTO, NodeD3, NodeUpdateDTO,} from '@/domain/entities/Node'
import {
    Relationship,
    RelationshipCreateDTO,
    RelationshipD3,
    RelationshipUpdateDTO,
} from '@/domain/entities/Relationship'
import {InteractionState} from '@/features/graph/constants'
import {IGraphContext} from '@/features/graph/context'
import {DialogType, useDialog} from '@/features/graph/hooks/useDialog'
import {useToast} from '@/ui/Toast/hooks/useToast'
import {ViewModel} from "@/features/graph/ViewModel";

const DEFAULT_RELATIONSHIP_TARGETS = {source: '-1', target: '-1'}

export const useInteraction = (viewModel: ViewModel): IGraphContext => {
    const {add} = useToast()
    const {dialog, dialogType, prevType, setDialogType, setProps} = useDialog()

    const [nodes, setNodes] = useState<NodeD3[]>([])
    const [relationships, setRelationships] = useState<RelationshipD3[]>([])
    const [labels, setLabels] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])

    const [addNodePosition, setAddNodePosition] = useState({x: 0, y: 0})

    const state = useRef<InteractionState>(InteractionState.DEFAULT)
    const createRelationshipTargets = useRef(DEFAULT_RELATIONSHIP_TARGETS)

    const getNodes = async () => {
        try {
            const {nodes, labels, relationships, types} =
                await viewModel.getGraph()

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

            const nodeD3 = await viewModel.createNode(node)
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

            const {node: nodeD3, relationships: updatedRelationships} =
                await viewModel.updateNode(node, updatedNode, relationships, {x: node.x, y: node.y})

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

    const deleteNode = async (nodeId: string) => {
        try {
            await viewModel.deleteNode(nodeId)

            setNodes(nodes.filter((node) => node.elementId !== nodeId))
            setRelationships(
                relationships.filter(
                    (relationship) =>
                        relationship.endNodeElementId !== nodeId &&
                        relationship.startNodeElementId !== nodeId,
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

            const relationshipD3 = await viewModel.createRelationship(relationship)

            if (relationshipD3.type && !types.includes(relationshipD3.type)) {
                setTypes([...types, relationshipD3.type])
            }

            setRelationships([...getRelationshipsWithoutTemplate(), relationshipD3])
            add('success', 'Relationship successfully created.')

            createRelationshipTargets.current = DEFAULT_RELATIONSHIP_TARGETS
        } catch (error: any) {
            add('error', error.message)
        } finally {
            setDialogType(DialogType.NONE)
        }
    }

    const updateRelationship = async (relationshipId: string, type: string, properties: KeyValue) => {
        try {
            const relationship = await viewModel.updateRelationship(relationshipId, new RelationshipUpdateDTO(type, properties))

            if (relationship.type && !types.includes(relationship.type)) {
                setTypes([...types, relationship.type])
            }

            setRelationships([...relationships.filter((relationship) => relationship.elementId !== relationshipId), relationship])

            add('success', 'Relationship successfully updated.')
        } catch (error: any) {
            add('error', error.message)
        } finally {
            setDialogType(DialogType.NONE)
        }
    }

    const deleteRelationship = async (relationshipId: string) => {
        try {
            await viewModel.deleteRelationship(relationshipId)

            setRelationships(
                relationships.filter(
                    (relationship) =>
                        relationship.elementId !== relationshipId,
                ),
            )

            add('success', 'Relationship successfully deleted.')
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
            new Node('-1', {low: -1, high: -1}, labels, properties),
            initialNode?.x || addNodePosition.x,
            initialNode?.y || addNodePosition.y,
        )

        setNodes([...getNodesWithoutTemplate(), node])
    }

    const updateRelationshipTemplate = (type: string, properties: KeyValue, initialRelationship?: RelationshipD3) => {
        const relationship = new RelationshipD3(
            new Relationship(
                initialRelationship?.elementId || '-1',
                initialRelationship?.identity || {low: -1, high: -1},
                initialRelationship?.end || {low: -1, high: -1},
                initialRelationship?.target || createRelationshipTargets.current.target,
                initialRelationship?.start || {low: -1, high: -1},
                initialRelationship?.source || createRelationshipTargets.current.source,
                properties,
                type || '',
            ),
        )

        if (initialRelationship) {
            setRelationships([...relationships.filter((relationship) => relationship.elementId !== initialRelationship.elementId), relationship])
        } else {
            setRelationships([...getRelationshipsWithoutTemplate(), relationship])
        }
    }

    const clickHandler = (payload?: any) => {
        switch (state.current) {
            case InteractionState.DELETE_NODE:
                const nodeRelationships = relationships.filter((relationship) => relationship.startNodeElementId === payload?.nodeId || relationship.endNodeElementId === payload?.nodeId)
                const amount = nodeRelationships.length

                if (!amount) {
                    deleteNode(payload?.nodeId)
                    return
                }

                setDialogType(DialogType.DELETE_NODE)
                setProps({nodeId: payload?.nodeId, relationshipsAmount: amount})
                break
            case InteractionState.UPDATE_NODE:
                setDialogType(DialogType.UPDATE_NODE)
                const initialNode = nodes.find(
                    (node) => node.elementId === payload.nodeId,
                )
                setProps({initialNode})
                break
            case InteractionState.READ_NODE:
                const nodeId = payload.nodeId
                const node = nodes.find((node) => node.elementId === nodeId)
                setProps({node})
                setDialogType(DialogType.NODE_DETAILS)
                break
            case InteractionState.READ_RELATIONSHIP:
                const relationshipId = payload.relationshipId
                const relationship = relationships.find(
                    (relationship) => relationship.elementId === relationshipId,
                )
                setProps({relationship})
                setDialogType(DialogType.RELATIONSHIP_DETAILS)
                break
            case InteractionState.UPDATE_RELATIONSHIP:
                setDialogType(DialogType.UPDATE_RELATIONSHIP)
                const initialRelationship = relationships.find(
                    (relationship) => relationship.elementId === payload.relationshipId
                )
                setProps({initialRelationship})
                break
            case InteractionState.CREATE_NODE:
                setDialogType(DialogType.CREATE_NODE)
                setAddNodePosition({x: payload.x, y: payload.y})
        }
    }

    useEffect(() => {
        if (dialogType === DialogType.NONE) {
            if (prevType === DialogType.NODE_DETAILS && state.current === InteractionState.CREATE_RELATIONSHIP) {
                return
            }

            switch (prevType) {
                case DialogType.CREATE_NODE:
                    setNodes(getNodesWithoutTemplate())
                    state.current = InteractionState.DEFAULT
                    break
                case DialogType.NODE_DETAILS:
                case DialogType.RELATIONSHIP_DETAILS:
                    state.current = InteractionState.DEFAULT
                    break
                case DialogType.CREATE_RELATIONSHIP:
                    createRelationshipTargets.current = DEFAULT_RELATIONSHIP_TARGETS
                    setRelationships(getRelationshipsWithoutTemplate())
                    state.current = InteractionState.DEFAULT
                    break
                case DialogType.UPDATE_NODE:
                    setNodes(getNodesWithoutTemplate())
                    setProps({})
                    state.current = InteractionState.DEFAULT
                    break
                case DialogType.UPDATE_RELATIONSHIP:
                    setRelationships(getRelationshipsWithoutTemplate())
                    setProps({})
                    state.current = InteractionState.DEFAULT
                    break
                case DialogType.DELETE_NODE:
                    state.current = InteractionState.DEFAULT
                    setProps({})
                    break
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
        updateRelationship,
        deleteRelationship,
        setSource,
        setTarget,
        updateNodeTemplate,
        updateRelationshipTemplate,
        clickHandler,
    }
}
