import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function blocksmodified(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let r = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_0").data;
                    let r1 = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_1").data;
                    let r2 = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_2").data;
                    let r3 = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_3").data;
                    let r4 = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_4").data;
                    let bmEntry = [new BlockStatDB(r), new BlockStatDB(r1), new BlockStatDB(r2), new BlockStatDB(r3), new BlockStatDB(r4)];
                    for (let i of bmEntry) {
                        if (i.getEntryById(args.get(locale.get("cmd_args_blockName"))) != null) {
                            if (args.get(locale.get("cmd_args_statType")) == locale.get("cmd_args_blocksBroken")) {
                                return new MCWLCommandReturn(0, locale.get("cmd_return_blocksmodified_0_broken_info"), args.get(locale.get("cmd_args_target")), i.getEntryById(args.get(locale.get("cmd_args_blockName"))).blocksBroken, i.getEntryById(args.get(locale.get("cmd_args_blockName"))).id);
                            }
                            else {
                                return new MCWLCommandReturn(0, locale.get("cmd_return_blocksmodified_0_placed_info"), args.get(locale.get("cmd_args_target")), i.getEntryById(args.get(locale.get("cmd_args_blockName"))).blocksPlaced, i.getEntryById(args.get(locale.get("cmd_args_blockName"))).id);
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
function blocksmodifiedSucceed(s, args) {
    printStream.success(s, args);
}
function blocksmodifiedFail(s, args) {
    printStream.failure(s, args);
}
function blocksmodifiedInfo(s, args) {
    printStream.info(s, args);
}
const blocksmodifiedCmd = new Command(locale.get("cmd_name_blocksmodified"), locale.get("cmd_description_blocksmodified"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_blockName"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_statType"), ARG_RADIO([locale.get("cmd_args_blocksBroken"), locale.get("cmd_args_blocksPlaced")]), false),
    ])
], blocksmodified, blocksmodifiedSucceed, blocksmodifiedFail, blocksmodifiedInfo, 3);
export { blocksmodifiedCmd };
