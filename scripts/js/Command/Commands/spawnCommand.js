import { CommandFormat, CommandParameter, ARG_STRING, ARG_WORLD_POS, ARG_NUMBER } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { DataHelper } from "../../Utils/data/DataHelper.js";
import { BlockLocation, world } from "mojang-minecraft";
import { printStream } from "../../Main.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function spawn(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let coords = DataHelper.parseCoords(args.get(locale.get("cmd_args_position")), player);
            if (coords == []) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_default"), spawnCmd.name);
            }
            for (let i = 0; i < args.get(locale.get("cmd_args_count")); i++) {
                world.getDimension("overworld").spawnEntity(args.get(locale.get("cmd_args_entity")), new BlockLocation(coords[0], coords[1] + 1, coords[2]));
            }
            return new MCWLCommandReturn(0, locale.get("cmd_return_spawn_0_success"), parseInt(args.get(locale.get("cmd_args_count"))), args.get(locale.get("cmd_args_entity")), coords[0], coords[1] + 1, coords[2]);
        case 1:
            let loc = new BlockLocation(Math.floor(player.location.x), Math.floor(player.location.y + 1), Math.floor(player.location.z));
            for (let i = 0; i < parseInt(args.get(locale.get("cmd_args_count"))); i++) {
                world.getDimension("overworld").spawnEntity(args.get(locale.get("cmd_args_entity")), loc);
            }
            return new MCWLCommandReturn(0, locale.get("cmd_return_spawn_0_success"), parseInt(args.get(locale.get("cmd_args_count"))), args.get(locale.get("cmd_args_entity")), loc.x, loc.y + 1, loc.z);
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), spawnCmd.name);
    }
}
function spawnSucceed(s, args) {
    printStream.success(s, args);
}
function spawnFail(s, args) {
    printStream.failure(s, args);
}
function spawnInfo(s, args) {
    printStream.info(s, args);
}
const spawnCmd = new Command(locale.get("cmd_name_spawn"), locale.get("cmd_description_spawn"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_entity"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_position"), ARG_WORLD_POS, false),
        new CommandParameter(locale.get("cmd_args_count"), ARG_NUMBER, true),
    ]),
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_entity"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_count"), ARG_STRING, true)
    ]),
], spawn, spawnSucceed, spawnFail, spawnInfo, 3);
export { spawnCmd };
