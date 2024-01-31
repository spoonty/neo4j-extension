import {GraphFactory} from "@/domain/factories/Graph.factory";
import {Node, NodeD3} from "@/domain/entities/Node";
import {Relationship, RelationshipD3} from "@/domain/entities/Relationship";
import {GraphD3} from "@/domain/entities/Graph";

export class ViewModel {
    constructor(private graphFactory: GraphFactory) {
    }

    async getGraph() {
        const usecase = this.graphFactory.getGraphCase()
        const {nodes, relationships} = await usecase.execute()

        const {nodesD3, labels} = this.parseNodes(nodes)
        const {relationshipsD3, types} = this.parseRelationships(relationships)

        return new GraphD3(nodesD3, relationshipsD3, labels, types)
    }

    private parseNodes = (nodes: Node[]) => {
        const nodesD3: NodeD3[] = []
        const labels: string[] = []

        nodes.forEach((node: Node) => {
            nodesD3.push(new NodeD3(node))

            node.labels.forEach((label) => {
                if (!labels.includes(label)) {
                    labels.push(label)
                }
            })
        })

        return {nodesD3, labels}
    }

    private parseRelationships = (relationships: Relationship[]) => {
        const relationshipsD3: RelationshipD3[] = []
        const types: string[] = []

        relationships.forEach((relation: Relationship) => {
            relationshipsD3.push(new RelationshipD3(relation))

            if (relation.type && !types.includes(relation.type)) {
                types.push(relation.type)
            }
        })

        return {relationshipsD3, types}
    }
}