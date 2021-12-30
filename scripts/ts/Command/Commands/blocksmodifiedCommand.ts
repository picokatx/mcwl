import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatEntry } from "../../Utils/stats/BlockStatEntry.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { Player, world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function blocksmodified(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = world.getPlayers()
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
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function blocksmodifiedSucceed(suc: string) {
    printStream.success(suc);
}
function blocksmodifiedFail(err: string) {
    printStream.failure(err);
}
function blocksmodifiedInfo(inf: string) {
    printStream.info(inf);
}
const blocksmodifiedCmd = new Command(
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
    blocksmodified,
    blocksmodifiedSucceed,
    blocksmodifiedFail,
    blocksmodifiedInfo,
    3
);
export { blocksmodifiedCmd };