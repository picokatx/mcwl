import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerData } from "../../Utils/data/PlayerData.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatEntry } from "../../Utils/stats/BlockStatEntry.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { Player, world } from "mojang-minecraft";
import { blockIntNamespaces, BlocksIntDB } from "../../Utils/stats/BlocksIntDB.js";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function blocksint(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = world.getPlayers()
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let r: BlocksIntDB = new BlocksIntDB(PlayerTag.read(i, MCWLNamespaces.blockInteractions).data);
                    //printStream.println(r.db);
                    let entry = r.getEntryById(args.get("statType"));
                    return [`Username: ${args.get("target")}, [${entry.stat}] : ${entry.count}`, 0];
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function blocksintSucceed(suc: string) {
    printStream.success(suc);
}
function blocksintFail(err: string) {
    printStream.failure(err);
}
function blocksintInfo(inf: string) {
    printStream.info(inf);
}
const blocksintCmd = new Command(
    "blocksint",
    "Displays number of interactions with block",
    [
        new CommandFormat(
            [
                new CommandParameter("target", ARG_STRING, false),
                new CommandParameter("statType", ARG_RADIO(Array.from(blockIntNamespaces.keys())), false),
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