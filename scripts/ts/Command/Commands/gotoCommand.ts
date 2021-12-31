import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { BlockLocation, Player } from "mojang-minecraft";
import { printStream } from "../../Main.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function goto(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let b = player.getBlockFromViewVector();
            if (b != null) {
                let bLoc: BlockLocation = player.getBlockFromViewVector().location;
                while (!player.dimension.getBlock(bLoc).isEmpty) {
                    bLoc = bLoc.above();
                }
                printStream.run(`tp @s ${bLoc.x} ${bLoc.y} ${bLoc.z}`, player);
                return new MCWLCommandReturn(0, locale.get("cmd_return_goto_0_success"), player.name, Math.round(player.location.x), Math.round(player.location.y) + 1, Math.round(player.location.z), bLoc.x, bLoc.y, bLoc.z);
            } else {
                return new MCWLCommandReturn(1, locale.get("cmd_return_goto_0_failure"));
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_description_goto"), gotoCmd.name);
    }
}
function gotoSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function gotoFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function gotoInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const gotoCmd = new Command(
    locale.get("cmd_name_goto"),
    locale.get("cmd_description_goto"),
    [
        new CommandFormat([])
    ],
    goto,
    gotoSucceed,
    gotoFail,
    gotoInfo,
    3
);
export { gotoCmd };