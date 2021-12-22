import { CommandFormat } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream } from "../../Main.js";
function goto(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let b = player.getBlockFromViewVector();
            if (b != null) {
                let bLoc = player.getBlockFromViewVector().location;
                while (!player.dimension.getBlock(bLoc).isEmpty) {
                    bLoc = bLoc.above();
                }
                printStream.run(`tp @s ${bLoc.x} ${bLoc.y} ${bLoc.z}`, player);
                return [`${player.name} teleported from [${Math.round(player.location.x)}, ${Math.round(player.location.y) + 1}, ${Math.round(player.location.z)}] to [${bLoc.x}, ${bLoc.y}, ${bLoc.z}]`, 0];
            }
            else {
                return [`Solid Blocks on cursor not found.`, 1];
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function gotoSucceed(suc) {
    printStream.success(suc);
}
function gotoFail(err) {
    printStream.failure(err);
}
function gotoInfo(inf) {
    printStream.info(inf);
}
const gotoCmd = new Command("goto", "Jumps to block player is looking at", [
    new CommandFormat([])
], goto, gotoSucceed, gotoFail, gotoInfo, 3);
export { gotoCmd };
