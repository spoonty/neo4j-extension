import {Neo4jRepository} from "@/domain/neo4j/repository/Neo4jRepository.interface";
import {UseCase} from "@/utils/domain";
import {DeleteNodeError} from "@/domain/errors/DeleteNodeError";

type Func = Neo4jRepository['deleteNode']

export abstract class DeleteNodeCase implements UseCase<Promise<void>> {
  abstract execute(nodeId: string): Promise<void>
}

export class DeleteNodeCaseImpl implements DeleteNodeCase {
  constructor(private deleteNode: Func) {}

  async execute(nodeId: string): Promise<void> {
    try {
      await this.deleteNode(nodeId)
    } catch {
      throw new DeleteNodeError()
    }
  }
}