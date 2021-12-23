import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { blockIntNamespaces, BlocksIntDB } from "../../Utils/stats/BlocksIntDB.js";
function blocksint(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let r = new BlocksIntDB(PlayerTag.read(i, "dpm:block_interactions").data);
                    let entry = r.getEntryById(args.get("statType"));
                    return [`Username: ${args.get("target")}, [${entry.stat}] : ${entry.count}`, 0];
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function blocksintSucceed(suc) {
    printStream.success(suc);
}
function blocksintFail(err) {
    printStream.failure(err);
}
function blocksintInfo(inf) {
    printStream.info(inf);
}
const blocksintCmd = new Command("blocksint", "Displays number of interactions with block", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false),
        new CommandParameter("statType", ARG_RADIO(Array.from(blockIntNamespaces.keys())), false),
    ])
], blocksint, blocksintSucceed, blocksintFail, blocksintInfo, 3);
export { blocksintCmd };
