import { Player } from "mojang-minecraft"
import { CommandFormat } from "./CommandParameter"
import { MCWLCommandReturn } from "./MCWLCmdReturn"
export class Command {
    name: string
    description: string
    cmdParameters: CommandFormat[]
    execute: (player: Player, args: Map<string, any>, subCmd: number) => MCWLCommandReturn
    success: (s: string, ...args: any) => void
    failure: (s: string, ...args: any) => void
    info: (s: string, ...args: any) => void
    opLevel: number

    constructor(
        name: string,
        description: string,
        cmdParameters: CommandFormat[],
        execute: (player: Player, args: Map<string, any>, subCmd: number) => MCWLCommandReturn,
        success: (s: string, ...args: any) => void,
        failure: (s: string, ...args: any) => void,
        info: (s: string, ...args: any) => void,
        opLevel: number) {
        this.name = name
        this.description = description
        this.cmdParameters = cmdParameters
        this.execute = execute
        this.success = success
        this.failure = failure
        this.info = info
        this.opLevel = opLevel
    }
}