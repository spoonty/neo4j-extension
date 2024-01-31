import {UseCase} from "@/utils/domain";
import {Graph} from "@/domain/entities/Graph";

export abstract class GetGraphCase implements UseCase<Promise<Graph>> {
    abstract execute(): Promise<Graph>
}