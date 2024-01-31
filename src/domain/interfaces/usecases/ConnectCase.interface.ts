import {UseCase} from "@/utils/domain";

export abstract class ConnectCase implements UseCase<Promise<void>> {
    abstract execute(url: string, username: string, password: string): Promise<void>
}