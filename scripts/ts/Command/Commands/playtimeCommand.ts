import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerData } from "../../Utils/data/PlayerData.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatEntry, BSEntryJSONData } from "../../Utils/stats/BlockStatEntry.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { Player } from "mojang-minecraft";
function playtime(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = Minecraft.world.getPlayers()
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let playTime: number = PlayerTag.read(i, "dpm:playtime").data;
                    return [`${args.get("target")} has played for ${playTime}`, 0];
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function playtimeSucceed(suc: string) {
    printStream.success(suc);
}
function playtimeFail(err: string) {
    printStream.failure(err);
}
function playtimeInfo(inf: string) {
    printStream.info(inf);
}
const playtimeCmd = new Command(
    "playtime",
    "Displays playtime of player",
    [
        new CommandFormat(
            [
                new CommandParameter("target", ARG_STRING, false)
            ]
        )
    ],
    playtime,
    playtimeSucceed,
    playtimeFail,
    playtimeInfo,
    3
);
export { playtimeCmd };