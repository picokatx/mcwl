import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { blockIntNamespaces, BlocksIntDB } from "../../Utils/stats/BlocksIntDB.js";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function blocksint(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let r = new BlocksIntDB(PlayerTag.read(i, MCWLNamespaces.blockInteractions).data);
                    let entry = r.getEntryById(args.get(locale.get("cmd_args_statType")));
                    return new MCWLCommandReturn(0, locale.get("cmd_return_blocksint_0_info"), args.get("target"), entry.stat, entry.count);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), blocksintCmd.name);
    }
}
function blocksintSucceed(s, args) {
    printStream.success(s, args);
}
function blocksintFail(s, args) {
    printStream.failure(s, args);
}
function blocksintInfo(s, args) {
    printStream.info(s, args);
}
const blocksintCmd = new Command(locale.get("cmd_name_blocksint"), locale.get("cmd_description_blocksint"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_statType"), ARG_RADIO(Array.from(blockIntNamespaces.keys())), false),
    ])
], blocksint, blocksintSucceed, blocksintFail, blocksintInfo, 3);
export { blocksintCmd };
