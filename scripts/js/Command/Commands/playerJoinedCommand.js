import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function playerjoined(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let playerJoined = PlayerTag.read(i, MCWLNamespaces.playerJoined).data;
                    return [`${args.get("target")} has joined this world ${playerJoined} times`, 0];
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function playerjoinedSucceed(suc) {
    printStream.success(suc);
}
function playerjoinedFail(err) {
    printStream.failure(err);
}
function playerjoinedInfo(inf) {
    printStream.info(inf);
}
const playerjoinedCmd = new Command("playerjoined", "Displays number of times player has joined world", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false)
    ])
], playerjoined, playerjoinedSucceed, playerjoinedFail, playerjoinedInfo, 3);
export { playerjoinedCmd };
