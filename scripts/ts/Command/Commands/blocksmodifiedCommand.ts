import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { EntityIterator, Player, world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function blocksmodified(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: EntityIterator = world.getPlayers()
            for (let i of players) {
                if ((i as Player).name == args.get(locale.get("cmd_args_target"))) {
                    let r  = playerDB.get((i as Player).name).blockMod
                    for (let i of r) {
                        if (i.getEntryById(args.get(locale.get("cmd_args_blockName"))) != null) {
                            if (args.get(locale.get("cmd_args_statType")) == locale.get("cmd_args_blocksBroken")) {
                                return new MCWLCommandReturn(0, locale.get("cmd_return_blocksmodified_0_broken_info"), args.get(locale.get("cmd_args_target")), i.getEntryById(args.get(locale.get("cmd_args_blockName"))).blocksBroken, i.getEntryById(args.get(locale.get("cmd_args_blockName"))).id)
                            } else {
                                return new MCWLCommandReturn(0, locale.get("cmd_return_blocksmodified_0_placed_info"), args.get(locale.get("cmd_args_target")), i.getEntryById(args.get(locale.get("cmd_args_blockName"))).blocksPlaced, i.getEntryById(args.get(locale.get("cmd_args_blockName"))).id)
                            }
                        }
                    }
                    return new MCWLCommandReturn(1, locale.get("cmd_return_blocksmodified_0_failure"), args.get("blockName"));
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), blocksmodifiedCmd.name);
    }
}
function blocksmodifiedSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function blocksmodifiedFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function blocksmodifiedInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const blocksmodifiedCmd = new Command(
    locale.get("cmd_name_blocksmodified"),
    locale.get("cmd_description_blocksmodified"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false),
                new CommandParameter(locale.get("cmd_args_blockName"), ARG_STRING, false),
                new CommandParameter(locale.get("cmd_args_statType"), ARG_RADIO([locale.get("cmd_args_blocksBroken"), locale.get("cmd_args_blocksPlaced")]), false),
            ]
        )
    ],
    blocksmodified,
    blocksmodifiedSucceed,
    blocksmodifiedFail,
    blocksmodifiedInfo,
    3
);
export { blocksmodifiedCmd };