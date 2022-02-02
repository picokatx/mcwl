import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation } from "mojang-minecraft";
import { DataHelper } from "../../Utils/data/DataHelper.js";
import { minWorldHeight } from "../../Utils/constants/MathConstants.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
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
                return new MCWLCommandReturn(1, locale.get("cmd_return_floor_0_failure"));
            }
            else {
                printStream.run(`tp @s ${playerLoc.x} ${floor} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_floor_0_success"), player.name);
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), floorCmd.name);
    }
}
function floorSucceed(s, args) {
    printStream.success(s, args);
}
function floorFail(s, args) {
    printStream.failure(s, args);
}
function floorInfo(s, args) {
    printStream.info(s, args);
}
const floorCmd = new Command(locale.get("cmd_name_floor"), locale.get("cmd_description_floor"), [
    new CommandFormat([])
], floor, floorSucceed, floorFail, floorInfo, 3);
export { floorCmd };
