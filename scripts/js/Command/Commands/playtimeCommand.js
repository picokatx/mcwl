import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function playtime(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let playTime = PlayerTag.read(i, MCWLNamespaces.playtime).data;
                    printStream.println(`${playTime}`);
                    return [`${args.get("target")} has played for ${playTime} ticks`, 0];
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function playtimeSucceed(suc) {
    printStream.success(suc);
}
function playtimeFail(err) {
    printStream.failure(err);
}
function playtimeInfo(inf) {
    printStream.info(inf);
}
const playtimeCmd = new Command("playtime", "Displays playtime of player", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false)
    ])
], playtime, playtimeSucceed, playtimeFail, playtimeInfo, 3);
export { playtimeCmd };
