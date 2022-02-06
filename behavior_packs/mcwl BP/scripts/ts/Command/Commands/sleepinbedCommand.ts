import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function sleepinbed(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let sleepinbed: number = playerDB.get((i as Player).name).sleepInBed
                    return new MCWLCommandReturn(0, locale.get("cmd_return_sleepinbed_0_info"), args.get(locale.get("cmd_args_target")), sleepinbed)
                }
            }

        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), sleepinbedCmd.name)
    }
}
function sleepinbedSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function sleepinbedFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function sleepinbedInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const sleepinbedCmd = new Command(
    locale.get("cmd_name_sleepinbed"),
    locale.get("cmd_description_sleepinbed"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    sleepinbed,
    sleepinbedSucceed,
    sleepinbedFail,
    sleepinbedInfo,
    3
)
export { sleepinbedCmd }