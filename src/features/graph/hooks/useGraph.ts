import { useEffect, useState } from 'react'
import { DriverImpl } from '@/data/driver/Driver.impl'
import { Neo4jRepositoryImpl } from '@/data/neo4j/repository/Neo4jRepository.impl'
import { Node, NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { Relation, RelationD3 } from '@/domain/neo4j/models/Relation'
import { IGraphContext } from '@/features/graph/context'
import { useToast } from '@/ui/Toast/hooks/useToast'

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

export const useGraph = (): IGraphContext => {
  const { add } = useToast()

  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relations, setRelations] = useState<RelationD3[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })

  const getNodes = async () => {
    const { nodes, relations } = await repository.getGraph()

    const nodesParsed: NodeD3[] = []
    const nodeLabels: string[] = []

    nodes.forEach((node: Node) => {
      nodesParsed.push(new NodeD3(node))

      node.labels.forEach((label) => {
        if (!nodeLabels.includes(label)) {
          nodeLabels.push(label)
        }
      })
    })

    const relationsParsed = relations.map(
      (relation: Relation) => new RelationD3(relation),
    )

    setNodes(nodesParsed)
    setLabels(nodeLabels)
    setRelations(relationsParsed)
  }

  const createNode = async (node: NodeCreateDTO) => {
    const result = await repository.addNode(node)
    const nodeD3 = new NodeD3(result, addNodePosition.x, addNodePosition.y)

    const nodeLabels: string[] = []
    result.labels.forEach((label) => {
      if (!labels.includes(label)) {
        nodeLabels.push(label)
      }
    })

    setNodes([...nodes.slice(0, nodes.length - 1), nodeD3])
    setLabels([...labels, ...nodeLabels])

    add('success', 'Node successfully created.')
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
    if (!!getTemplateNode()) {
      setNodes([...nodes.slice(0, nodes.length - 1)])
    }
  }

  const clickHandler = (x: number, y: number) => {
    setAddNodePosition({ x, y })
  }

  const getTemplateNode = () => nodes?.find((node) => node.elementId === '-1')

  useEffect(() => {
    getNodes()
  }, [])

  return {
    nodes,
    relations,
    labels,
    createNode,
    updateNodeTemplate,
    removeNodeTemplate,
    clickHandler,
  }
}
