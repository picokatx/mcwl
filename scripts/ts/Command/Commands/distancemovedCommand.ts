import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { EntityIterator, Player, world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function distancemoved(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get("target")) {
                    let distTravelled: number = playerDB.get((i as Player).name).distanceTravelled
                    return new MCWLCommandReturn(0, locale.get("cmd_return_distancemoved_0_info"), args.get(locale.get("cmd_args_target")), distTravelled);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), distancemovedCmd.name);
    }
}
function distancemovedSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function distancemovedFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function distancemovedInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const distancemovedCmd = new Command(
    locale.get("cmd_name_distancemoved"),
    locale.get("cmd_description_distancemoved"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    distancemoved,
    distancemovedSucceed,
    distancemovedFail,
    distancemovedInfo,
    3
);
export { distancemovedCmd };