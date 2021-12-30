import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerData } from "../../Utils/data/PlayerData.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatEntry, BSEntryJSONData } from "../../Utils/stats/BlockStatEntry.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { Player } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function blockstats(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = Minecraft.world.getPlayers()
            for (let i of players) {
                if (i.name==args.get("target")) {
                    let r: BlockStatEntry[] = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_0").data;
                    let r1: BlockStatEntry[] = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_1").data;
                    let r2: BlockStatEntry[] = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_2").data;
                    let r3: BlockStatEntry[] = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_3").data;
                    let r4: BlockStatEntry[] = PlayerTag.read(i, MCWLNamespaces.blocksModified + "_4").data;
                    let bmEntry:BlockStatDB[] = [new BlockStatDB(r),new BlockStatDB(r1),new BlockStatDB(r2),new BlockStatDB(r3),new BlockStatDB(r4)]
                    for (let i of bmEntry) {
                        if (i.getEntryById(args.get("blockName"))!=null) {
                            if (args.get("statType")=="blocksBroken") {
                                return [`${args.get("target")} has ${args.get("statType")} ${i.getEntryById(args.get("blockName")).blocksBroken} ${i.getEntryById(args.get("blockName")).id}.`,0]
                            } else {
                                return [`${args.get("target")} has ${args.get("statType")} ${i.getEntryById(args.get("blockName")).blocksPlaced} ${i.getEntryById(args.get("blockName")).id}.`,0]
                            }
                        }
                    }
                    return [`Invalid Block Name`,1]
                    /*
                    let entry = bsEntry.getEntryById(args.get("blockName"));
                    if (args.get("statType")=="blocksBroken") {
                        return [`${entry.blocksBroken} ${args.get("blockName")} have been broken by ${args.get("target")}`, 0];
                    } else {
                        return [`${entry.blocksPlaced} ${args.get("blockName")} have been placed by ${args.get("target")}`, 0];
                    }*/
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function blockstatsSucceed(suc: string) {
    printStream.success(suc);
}
function blockstatsFail(err: string) {
    printStream.failure(err);
}
function blockstatsInfo(inf: string) {
    printStream.info(inf);
}
const blockstatsCmd = new Command(
    "blocksmodified",
    "Displays statistics related to blocks",
    [
        new CommandFormat(
            [
                new CommandParameter("target", ARG_STRING, false),
                new CommandParameter("blockName", ARG_STRING, false),
                new CommandParameter("statType", ARG_RADIO(["blocksBroken", "blocksPlaced"]), false),
            ]
        )
    ],
    blockstats,
    blockstatsSucceed,
    blockstatsFail,
    blockstatsInfo,
    3
);
export { blockstatsCmd };