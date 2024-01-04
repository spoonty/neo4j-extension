import { useEffect, useState } from 'react'
import { DriverImpl } from '@/data/driver/Driver.impl'
import { Neo4jRepositoryImpl } from '@/data/neo4j/repository/Neo4jRepository.impl'
import { Node, NodeCreateDTO, NodeD3 } from '@/domain/neo4j/models/Node'
import { Relation, RelationD3 } from '@/domain/neo4j/models/Relation'

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

export const useInteraction = () => {
  const [nodes, setNodes] = useState<Array<NodeD3> | null>(null)
  const [relations, setRelations] = useState<Array<RelationD3> | null>(null)

  const [addNodePosition, setAddNodePosition] = useState({ x: 0, y: 0 })

  const getNodes = async () => {
    const { nodes, relations } = await repository.getGraph()
    setNodes(nodes.map((node: Node) => new NodeD3(node)))
    setRelations(
      relations.map((relation: Relation) => new RelationD3(relation)),
    )
  }

  const createNode = async (node: NodeCreateDTO) => {
    const result = await repository.addNode(node)
    const nodeD3 = new NodeD3(result, addNodePosition.x, addNodePosition.y)

    if (nodes) {
      setNodes([...nodes.slice(0, nodes.length - 1), nodeD3])
    }
  }

  const getTemplateNode = () => nodes?.find((node) => node.elementId === '-1')

  const createNodeTemplate = (labels: string[], properties: KeyValue) => {
    const node = new NodeD3(
      new Node('-1', { low: -1, high: -1 }, labels, properties),
      addNodePosition.x,
      addNodePosition.y,
    )

    if (nodes) {
      if (!!getTemplateNode()) {
        setNodes([...nodes.slice(0, nodes.length - 1), node])
      } else {
        setNodes([...nodes, node])
      }
    }
  }

  const removeNodeTemplate = () => {
    if (nodes && !!getTemplateNode()) {
      setNodes([...nodes.slice(0, nodes.length - 1)])
    }
  }

  const clickHandler = (x: number, y: number) => {
    setAddNodePosition({ x, y })
  }

  useEffect(() => {
    getNodes()
  }, [])

  return {
    nodes,
    relations,
    createNode,
    clickHandler,
    createNodeTemplate,
    removeNodeTemplate,
  }
}
