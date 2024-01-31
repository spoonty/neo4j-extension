import {GetGraphError} from '@/domain/errors/GetGraphError'
import {Graph} from '@/domain/entities/Graph'
import {GraphRepository} from '@/domain/interfaces/repositories/GraphRepository.interface'
import {GetGraphCase} from "@/domain/interfaces/usecases/GetGraphCase.interface";

type Func = GraphRepository['getGraph']

export class GetGraphCaseImpl implements GetGraphCase {
    constructor(private getGraph: Func) {
    }

    async execute(): Promise<Graph> {
        try {
            const {nodes, relationships} = await this.getGraph()

            return new Graph(nodes, relationships)
        } catch {
            throw new GetGraphError()
        }
    }
}
