import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function distmovedstats(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = Minecraft.world.getPlayers();
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
function distmovedstatsSucceed(suc) {
    printStream.success(suc);
}
function distmovedstatsFail(err) {
    printStream.failure(err);
}
function distmovedstatsInfo(inf) {
    printStream.info(inf);
}
const distmovedstatsCmd = new Command("distancemoved", "Displays distance travelled by player in metres", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false)
    ])
], distmovedstats, distmovedstatsSucceed, distmovedstatsFail, distmovedstatsInfo, 3);
export { distmovedstatsCmd };
