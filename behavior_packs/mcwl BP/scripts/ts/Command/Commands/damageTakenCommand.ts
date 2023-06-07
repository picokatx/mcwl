import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { printStream, playerDB} from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"

function damagetaken(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let health: string = playerDB.get((i as Player).name).health.toString()
                    return new MCWLCommandReturn(0, locale.get("cmd_return_damagetaken_0_success"), args.get(locale.get("cmd_args_target")), health)
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), damagetakenCmd.name)
    }
}
function damagetakenSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function damagetakenFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function damagetakenInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const damagetakenCmd = new Command(
    locale.get("cmd_name_damagetaken"),
    locale.get("cmd_description_damagetaken"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    damagetaken,
    damagetakenSucceed,
    damagetakenFail,
    damagetakenInfo,
    3
)
export { damagetakenCmd }