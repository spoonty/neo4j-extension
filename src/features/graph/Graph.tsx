import { FC, useEffect, useRef, useState } from 'react'
import { DriverImpl } from '@/data/driver/Driver.impl'
import { Neo4jRepositoryImpl } from '@/data/neo4j/repository/Neo4jRepository.impl'
import { Node, NodeD3 } from '@/domain/neo4j/models/Node'
import { Relation, RelationD3 } from '@/domain/neo4j/models/Relation'
import AddNodeDrawer from '@/features/add-node/AddNodeDrawer'
import useGraph from '@/features/graph/hooks/useGraph'

const driver = new DriverImpl()
const repository = new Neo4jRepositoryImpl(driver)

const Graph: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  const [nodes, setNodes] = useState<Array<NodeD3> | null>(null)
  const [relations, setRelations] = useState<Array<RelationD3> | null>(null)

  const [addNode, setAddNode] = useState(false)

  useGraph(svgRef, nodes, relations)

  const getNodes = async () => {
    const { nodes, relations } = await repository.getGraph()
    setNodes(nodes.map((node: Node) => new NodeD3(node)))
    setRelations(
      relations.map((relation: Relation) => new RelationD3(relation)),
    )
  }

  useEffect(() => {
    getNodes()
  }, [])

  const clickHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    setAddNode(true)
  }

  return (
    <div>
      <svg ref={svgRef} onClick={clickHandler} />
      <AddNodeDrawer open={addNode} onClose={() => setAddNode(false)} />
    </div>
  )
}

export default Graph
