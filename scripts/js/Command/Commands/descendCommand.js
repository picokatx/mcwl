import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation } from "mojang-minecraft";
import { DataHelper } from "../../Utils/data/DataHelper.js";
function descend(player, args, subCmd) {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) - 1, Math.floor(player.location.z));
    let floor = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y >= -64 && levelCount < args.get("levels")) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= args.get("padding")) {
                        levelCount++;
                        floor = playerLoc.y + 1;
                    }
                    levelPaddingCount = 0;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Descended ${args.get("levels")} levels`, 0];
            }
        case 1:
            while (playerLoc.y >= -64 && levelCount < args.get("levels")) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= 2) {
                        levelCount++;
                        floor = playerLoc.y + 1;
                    }
                    levelPaddingCount = 0;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Descended ${args.get("levels")} levels`, 0];
            }
        case 2:
            while (levelPaddingCount < 2 && playerLoc.y >= -64) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (floor == player.location.y) {
                return [`Unable to find teleport location`, 1];
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return [`Descended 1 level`, 0];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function descendSucceed(suc) {
    printStream.success(suc);
}
function descendFail(err) {
    printStream.failure(err);
}
function descendInfo(inf) {
    printStream.info(inf);
}
const descendCmd = new Command("descend", "Teleports player to lower level", [
    new CommandFormat([
        new CommandParameter("levels", ARG_NUMBER, false),
        new CommandParameter("padding", ARG_NUMBER, false)
    ]),
    new CommandFormat([
        new CommandParameter("levels", ARG_NUMBER, false)
    ]),
    new CommandFormat([])
], descend, descendSucceed, descendFail, descendInfo, 3);
export { descendCmd };
