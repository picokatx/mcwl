import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function distancemoved(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let distTravelled = PlayerTag.read(i, MCWLNamespaces.distanceTravelled).data;
                    return [`${args.get("target")} has travelled a total of ${distTravelled}m ingame`, 0];
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function distancemovedSucceed(suc) {
    printStream.success(suc);
}
function distancemovedFail(err) {
    printStream.failure(err);
}
function distancemovedInfo(inf) {
    printStream.info(inf);
}
const distancemovedCmd = new Command("distancemoved", "Displays distance travelled by player in metres", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false)
    ])
], distancemoved, distancemovedSucceed, distancemovedFail, distancemovedInfo, 3);
export { distancemovedCmd };
