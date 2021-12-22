import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { DataHelper } from "../../Utils/data/DataHelper.js";
function floor(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) - 1, Math.floor(player.location.z));
    let floor: number = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y >= -64) {
                if (!player.dimension.getBlock(playerLoc).isEmpty) {
                    floor = playerLoc.y+1;
                    break;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (playerLoc.y == -65) {
                return [`Unable to find teleport location`, 1];
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Teleported ${player.name} to floor`, 0];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function floorSucceed(suc: string) {
    printStream.success(suc);
}
function floorFail(err: string) {
    printStream.failure(err);
}
function floorInfo(inf: string) {
    printStream.info(inf);
}
const floorCmd = new Command(
    "floor",
    "Teleports player to floor",
    [
        new CommandFormat([])
    ],
    floor,
    floorSucceed,
    floorFail,
    floorInfo,
    3
);
export { floorCmd };