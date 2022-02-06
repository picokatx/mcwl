import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream, playerDB } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function debug(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let health = playerDB.get(i.name).healthVal;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_debug_0_success"), args.get(locale.get("cmd_args_target")), health);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), debugCmd.name);
    }
}
function debugSucceed(s, args) {
    printStream.success(s, args);
}
function debugFail(s, args) {
    printStream.failure(s, args);
}
function debugInfo(s, args) {
    printStream.info(s, args);
}
const debugCmd = new Command(locale.get("cmd_name_debug"), locale.get("cmd_description_debug"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], debug, debugSucceed, debugFail, debugInfo, 3);
export { debugCmd };
