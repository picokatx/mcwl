import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation } from "mojang-minecraft";
import { DataHelper } from "../../Utils/data/DataHelper.js";
import { minWorldHeight } from "../../Utils/constants/MathConstants.js";
function floor(player, args, subCmd) {
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) - 1, Math.floor(player.location.z));
    let floor = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y >= minWorldHeight) {
                if (!player.dimension.getBlock(playerLoc).isEmpty) {
                    floor = playerLoc.y + 1;
                    break;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (playerLoc.y == minWorldHeight - 1) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Teleported ${player.name} to floor`, 0];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function floorSucceed(suc) {
    printStream.success(suc);
}
function floorFail(err) {
    printStream.failure(err);
}
function floorInfo(inf) {
    printStream.info(inf);
}
const floorCmd = new Command("floor", "Teleports player to floor", [
    new CommandFormat([])
], floor, floorSucceed, floorFail, floorInfo, 3);
export { floorCmd };
