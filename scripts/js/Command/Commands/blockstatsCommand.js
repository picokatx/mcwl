import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
function blockstats(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = Minecraft.world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let r = PlayerTag.read(i, "dpm:block_stats");
                    let bsEntry = new BlockStatDB(r.data);
                    let entry = bsEntry.getEntryById(args.get("blockName"));
                    if (args.get("statType") == "blocksBroken") {
                        return [`${entry.blocksBroken} ${args.get("blockName")} have been broken by ${args.get("target")}`, 0];
                    }
                    else {
                        return [`${entry.blocksPlaced} ${args.get("blockName")} have been placed by ${args.get("target")}`, 0];
                    }
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function blockstatsSucceed(suc) {
    printStream.success(suc);
}
function blockstatsFail(err) {
    printStream.failure(err);
}
function blockstatsInfo(inf) {
    printStream.info(inf);
}
const blockstatsCmd = new Command("blockstats", "Displays statistics related to blocks", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false),
        new CommandParameter("blockName", ARG_STRING, false),
        new CommandParameter("statType", ARG_RADIO(["blocksBroken", "blocksPlaced"]), false),
    ])
], blockstats, blockstatsSucceed, blockstatsFail, blockstatsInfo, 3);
export { blockstatsCmd };
