import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { maxWorldHeight } from "../../Utils/constants/MathConstants.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function top(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    let playerLoc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y) + 1, Math.floor(player.location.z));
    let top: number = player.location.y;
    switch (subCmd) {
        case 0:
            while (playerLoc.y <= maxWorldHeight) {
                if (!player.dimension.getBlock(playerLoc).isEmpty) {
                    top = playerLoc.y - 2;
                    break;
                }
                playerLoc = playerLoc.above();
            }
            if (playerLoc.y == maxWorldHeight + 1) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_top_0_failure"));
            } else {
                printStream.run(`tp @s ${playerLoc.x} ${top} ${playerLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_top_0_success"), player.name);
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), topCmd.name);
    }
}
function topSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function topFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function topInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const topCmd = new Command(
    locale.get("cmd_name_top"),
    locale.get("cmd_description_top"),
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