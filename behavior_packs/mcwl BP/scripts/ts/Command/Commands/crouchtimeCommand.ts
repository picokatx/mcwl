import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function crouchtime(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let sneakTime: number = playerDB.get((i as Player).name).crouchTime
                    return new MCWLCommandReturn(0, locale.get("cmd_return_crouchtime_0_info"), args.get(locale.get("cmd_args_target")), sneakTime)
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), crouchtimeCmd.name)
    }
}
function crouchtimeSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function crouchtimeFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function crouchtimeInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const crouchtimeCmd = new Command(
    locale.get("cmd_name_crouchtime"),
    locale.get("cmd_description_crouchtime"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    crouchtime,
    crouchtimeSucceed,
    crouchtimeFail,
    crouchtimeInfo,
    3
)
export { crouchtimeCmd }