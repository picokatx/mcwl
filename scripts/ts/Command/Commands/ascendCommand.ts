import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { maxWorldHeight } from "../../Utils/constants/MathConstants.js";
function ascend(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) + 2, Math.floor(player.location.z));
    let floor: number = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    if (levelPaddingCount >= args.get("padding")) {
                        levelCount++;
                        if (levelCount >= args.get("levels")) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Ascended ${args.get("levels")} levels`, 0];
            }
        case 1:
            while (playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    if (levelPaddingCount >= 2) {
                        levelCount++;
                        if (levelCount >= args.get("levels")) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Ascended ${args.get("levels")} levels`, 0];
            }
        case 2:
            while (levelPaddingCount < 2 && playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Ascended 1 level`, 0];
            }
        default:
            return [`Command format does not exist, use ,help ${ascendCmd.name} for a list of all command formats`, 1];
    }
}
function ascendSucceed(suc: string) {
    printStream.success(suc);
}
function ascendFail(err: string) {
    printStream.failure(err);
}
function ascendInfo(inf: string) {
    printStream.info(inf);
}
const ascendCmd = new Command(
    "ascend",
    "Teleports player to upper level",
    [
        new CommandFormat([
            new CommandParameter("levels", ARG_NUMBER, false),
            new CommandParameter("padding", ARG_NUMBER, false)
        ]),
        new CommandFormat([
            new CommandParameter("levels", ARG_NUMBER, false)
        ]),
        new CommandFormat([])
    ],
    ascend,
    ascendSucceed,
    ascendFail,
    ascendInfo,
    3
);
export { ascendCmd };