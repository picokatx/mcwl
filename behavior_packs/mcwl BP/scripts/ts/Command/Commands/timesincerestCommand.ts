import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function timesincerest(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let timesincerest: number = playerDB.get((i as Player).name).timeSinceRest
                    return new MCWLCommandReturn(0, locale.get("cmd_return_timesincerest_0_info"), args.get(locale.get("cmd_args_target")), timesincerest)
                }
            }

        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), timesincerestCmd.name)
    }
}
function timesincerestSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function timesincerestFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function timesincerestInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const timesincerestCmd = new Command(
    locale.get("cmd_name_timesincerest"),
    locale.get("cmd_description_timesincerest"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    timesincerest,
    timesincerestSucceed,
    timesincerestFail,
    timesincerestInfo,
    3
)
export { timesincerestCmd }