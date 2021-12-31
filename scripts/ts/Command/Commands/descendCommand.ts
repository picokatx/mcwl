import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { DataHelper } from "../../Utils/data/DataHelper.js";
import { minWorldHeight } from "../../Utils/constants/MathConstants.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function descend(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) - 1, Math.floor(player.location.z));
    let floor: number = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y >= minWorldHeight && levelCount < args.get(locale.get("cmd_args_levels"))) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    if (levelPaddingCount >= args.get(locale.get("cmd_args_padding"))) {
                        levelCount++;
                        floor = playerLoc.y + 1;
                    }
                    levelPaddingCount = 0;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (floor == player.location.y) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_descend_0_failure"));
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_descend_0_success"), args.get(locale.get("cmd_args_levels")));
            }
        case 1:
            while (playerLoc.y >= minWorldHeight && levelCount < args.get(locale.get("cmd_args_levels"))) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    if (levelPaddingCount >= 2) {
                        levelCount++;
                        floor = playerLoc.y + 1;
                    }
                    levelPaddingCount = 0;
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (floor == player.location.y) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_descend_1_failure"));
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_descend_1_success"), args.get(locale.get("cmd_args_levels")));
            }
        case 2:
            while (playerLoc.y >= minWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                } else {
                    if (levelPaddingCount >= 2) {
                        break;
                    }
                }
                playerLoc = DataHelper.below(playerLoc);
            }
            if (playerLoc.y < minWorldHeight) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_descend_2_failure"));
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${playerLoc.y + 1} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_descend_2_success"));
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), descendCmd.name);
    }
}
function descendSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function descendFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function descendInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const descendCmd = new Command(
    locale.get("cmd_name_descend"),
    locale.get("cmd_description_descend"),
    [
        new CommandFormat([
            new CommandParameter(locale.get("cmd_args_levels"), ARG_NUMBER, false),
            new CommandParameter(locale.get("cmd_args_padding"), ARG_NUMBER, false)
        ]),
        new CommandFormat([
            new CommandParameter(locale.get("cmd_args_levels"), ARG_NUMBER, false)
        ]),
        new CommandFormat([])
    ],
    descend,
    descendSucceed,
    descendFail,
    descendInfo,
    3
);
export { descendCmd };