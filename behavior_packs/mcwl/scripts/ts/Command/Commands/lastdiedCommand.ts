import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function lastdied(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let lastdied: number = playerDB.get((i as Player).name).timeSinceDeath
                    return new MCWLCommandReturn(0, locale.get("cmd_return_lastdied_0_info"), args.get(locale.get("cmd_args_target")), lastdied)
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), lastdiedCmd.name)
    }
}
function lastdiedSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function lastdiedFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function lastdiedInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const lastdiedCmd = new Command(
    locale.get("cmd_name_lastdied"),
    locale.get("cmd_description_lastdied"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    lastdied,
    lastdiedSucceed,
    lastdiedFail,
    lastdiedInfo,
    3
)
export { lastdiedCmd }