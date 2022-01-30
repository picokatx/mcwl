import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { EntityIterator, Player, world } from "mojang-minecraft";
import { blockIntNamespaces } from "../../Utils/stats/BlocksIntDB.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function blocksint(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let entry = playerDB.get((i as Player).name).blockInt.getEntryById(args.get(locale.get("cmd_args_statType")));
                    return new MCWLCommandReturn(0, locale.get("cmd_return_blocksint_0_info"), args.get("target"), entry.stat, entry.count);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), blocksintCmd.name);
    }
}
function blocksintSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function blocksintFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function blocksintInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const blocksintCmd = new Command(
    locale.get("cmd_name_blocksint"),
    locale.get("cmd_description_blocksint"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false),
                new CommandParameter(locale.get("cmd_args_statType"), ARG_RADIO(Array.from(blockIntNamespaces.keys())), false),
            ]
        )
    ],
    blocksint,
    blocksintSucceed,
    blocksintFail,
    blocksintInfo,
    3
);
export { blocksintCmd };