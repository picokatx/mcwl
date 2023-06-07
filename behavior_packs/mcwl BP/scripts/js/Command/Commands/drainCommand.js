import { BlockLocation, MinecraftBlockTypes } from "mojang-minecraft";
import { printStream } from "../../Main.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
import { Command } from "../Command.js";
import { ARG_NUMBER, CommandFormat, CommandParameter } from "../CommandParameter.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
function drainAdjacent(dimension, loc, depth) {
    let block = dimension.getBlock(loc);
    if ((block.isWaterlogged || block.id == MinecraftBlockTypes.water.id || block.id == MinecraftBlockTypes.flowingWater.id) && depth > 0) {
        if (block.isWaterlogged) {
            block.isWaterlogged = false;
        }
        else if (block.id == MinecraftBlockTypes.water.id || block.id == MinecraftBlockTypes.flowingWater.id) {
            block.setType(MinecraftBlockTypes.air);
        }
        return drainAdjacent(dimension, loc.offset(0, 0, 1), depth - 1) +
            drainAdjacent(dimension, loc.offset(0, 1, 0), depth - 1) +
            drainAdjacent(dimension, loc.offset(1, 0, 0), depth - 1) +
            drainAdjacent(dimension, loc.offset(0, 0, -1), depth - 1) +
            drainAdjacent(dimension, loc.offset(0, -1, 0), depth - 1) +
            drainAdjacent(dimension, loc.offset(-1, 0, 0), depth - 1) + 1;
    }
    else {
        return 0;
    }
}
function toBLocation(loc) {
    return new BlockLocation(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
}
function drain(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let blocksDrained = drainAdjacent(player.dimension, toBLocation(player.location), args.get(locale.get("cmd_args_depth")));
            return new MCWLCommandReturn(0, locale.get("cmd_return_drain_0_success"), blocksDrained);
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), drainCmd.name);
    }
}
function drainSucceed(s, args) {
    printStream.success(s, args);
}
function drainFail(s, args) {
    printStream.failure(s, args);
}
function drainInfo(s, args) {
    printStream.info(s, args);
}
const drainCmd = new Command(locale.get("cmd_name_drain"), locale.get("cmd_description_drain"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_depth"), ARG_NUMBER, false)
    ])
], drain, drainSucceed, drainFail, drainInfo, 3);
export { drainCmd };
