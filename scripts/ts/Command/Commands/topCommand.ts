import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { maxWorldHeight } from "../../Utils/constants/MathConstants.js";
function top(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) + 1, Math.floor(player.location.z));
    let top: number = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y <= maxWorldHeight) {
                if (!player.dimension.getBlock(playerLoc).isEmpty) {
                    top = playerLoc.y-2;
                    break;
                }
                playerLoc = playerLoc.above();
            }
            if (playerLoc.y == -maxWorldHeight+1) {
                return [`Unable to find teleport location`, 1];
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${top} ${playerLoc.z}`, player);
                return [`Teleported ${player.name} to ceiling`, 0];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function topSucceed(suc: string) {
    printStream.success(suc);
}
function topFail(err: string) {
    printStream.failure(err);
}
function topInfo(inf: string) {
    printStream.info(inf);
}
const topCmd = new Command(
    "top",
    "Teleports player to ceiling",
    [
        new CommandFormat([])
    ],
    top,
    topSucceed,
    topFail,
    topInfo,
    3
);
export { topCmd };