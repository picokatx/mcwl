import {Player} from "mojang-minecraft";
import {CommandFormat} from "./CommandParameter";
export class Command {
    name: string;
    description: string;
    cmdParameters: CommandFormat[];
    execute: (player: Player, args: Map<string,any>, subCmd: number) => void;
    success: (suc: string) => void;
    failure: (failure: string) => void;
    info: (sinfouc: string) => void;
    opLevel: number;

    constructor(
        name: string,
        description: string,
        cmdParameters: CommandFormat[],
        execute: (player: Player, args: Map<string,any>, subCmd: number) => void,
        success: (suc: string) => void,
        failure: (failure: string) => void,
        info: (sinfouc: string) => void,
        opLevel: number) {
        this.name = name;
        this.description = description;
        this.cmdParameters = cmdParameters;
        this.execute = execute;
        this.success = success;
        this.failure = failure;
        this.info = info;
        this.opLevel = opLevel;
    }
}