import { useEffect, useState } from 'react'
import { DriverImpl } from '@/data/driver/Driver.impl'
import { Neo4jRepositoryImpl } from '@/data/neo4j/repository/Neo4jRepository.impl'
import { Node, NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { Relation, RelationD3 } from '@/domain/neo4j/models/Relation'
import { IGraphContext } from '@/features/graph/context'

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

export const useGraph = (): IGraphContext => {
  const [nodes, setNodes] = useState<NodeD3[]>([])
  const [relations, setRelations] = useState<RelationD3[]>([])
  const [labels, setLabels] = useState([])
  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })

  const getNodes = async () => {
    const { nodes, relations } = await repository.getGraph()

    const nodesParsed = nodes.map((node: Node) => new NodeD3(node))
    const relationsParsed = relations.map(
      (relation: Relation) => new RelationD3(relation),
    )

    setNodes(nodesParsed)
    setRelations(relationsParsed)
  }

  const createNode = async (node: NodeCreateDTO) => {
    const result = await repository.addNode(node)
    const nodeD3 = new NodeD3(result, addNodePosition.x, addNodePosition.y)

    setNodes([...nodes.slice(0, nodes.length - 1), nodeD3])
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
