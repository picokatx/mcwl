import { ARG_NUMBER, CommandParameter, CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation } from "mojang-minecraft";
import { maxWorldHeight } from "../../Utils/constants/MathConstants.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function ascend(player, args, subCmd) {
    let levelCount = 0;
    let levelPaddingCount = 0;
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) + 2, Math.floor(player.location.z));
    let floor = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= args.get(locale.get("cmd_args_padding"))) {
                        levelCount++;
                        if (levelCount >= args.get(locale.get("cmd_args_levels"))) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_ascend_0_failure"));
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_ascend_0_success"), args.get(locale.get("cmd_args_levels")));
            }
        case 1:
            while (playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= 2) {
                        levelCount++;
                        if (levelCount >= args.get(locale.get("cmd_args_levels"))) {
                            break;
                        }
                    }
                    floor = playerLoc.y + 1;
                    levelPaddingCount = 0;
                }
                playerLoc = playerLoc.above();
            }
            if (floor == player.location.y) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_ascend_1_failure"));
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_ascend_1_success"), args.get(locale.get("cmd_args_levels")));
            }
        case 2:
            levelPaddingCount = 2;
            while (playerLoc.y <= maxWorldHeight) {
                if (player.dimension.getBlock(playerLoc).isEmpty) {
                    levelPaddingCount++;
                }
                else {
                    if (levelPaddingCount >= 2) {
                        break;
                    }
                }
                playerLoc = playerLoc.above();
            }
            if (playerLoc.y > maxWorldHeight) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_ascend_2_failure"));
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${playerLoc.y + 1} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_ascend_2_success"));
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), ascendCmd.name);
    }
}
function ascendSucceed(s, args) {
    printStream.success(s, args);
}
function ascendFail(s, args) {
    printStream.failure(s, args);
}
function ascendInfo(s, args) {
    printStream.info(s, args);
}
const ascendCmd = new Command(locale.get("cmd_name_ascend"), locale.get("cmd_description_ascend"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_levels"), ARG_NUMBER, false),
        new CommandParameter(locale.get("cmd_args_padding"), ARG_NUMBER, false)
    ]),
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_levels"), ARG_NUMBER, false)
    ]),
    new CommandFormat([])
], ascend, ascendSucceed, ascendFail, ascendInfo, 3);
export { ascendCmd };
