import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { commands, printStream } from "../../Main.js"
import { Player } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function help(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            for (let i of commands) {
                if (i.name == args.get(locale.get("cmd_args_command"))) {
                    let format: string = ""
                    for (let j of i.cmdParameters) {
                        format += `\n,${i.name}`
                        for (let k of j.para) {
                            if (k.optional) {
                                format += ` <${k.name}?:${k.type.name}>`
                            } else {
                                format += ` <${k.name}:${k.type.name}>`
                            }
                        }
                    }
                    return new MCWLCommandReturn(0, locale.get("cmd_return_help_0_success"), i.name, i.description, format)
                }
            }
            return new MCWLCommandReturn(1, locale.get("cmd_return_help_0_failure"), args.get(locale.get("cmd_args_command")))
        case 1:
            let helpText = ""
            for (let i of commands) {
                helpText += `${i.name} - ${i.description}\n`
            }
            return new MCWLCommandReturn(0, locale.get("cmd_return_help_1_success"), helpText)
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), helpCmd.name)
    }
}
function helpSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function helpFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function helpInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const helpCmd = new Command(
    locale.get("cmd_name_help"),
    locale.get("cmd_description_help"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_command"), ARG_STRING, false)
            ]
        ),
        new CommandFormat([])
    ],
    help,
    helpSucceed,
    helpFail,
    helpInfo,
    3
)
export { helpCmd }