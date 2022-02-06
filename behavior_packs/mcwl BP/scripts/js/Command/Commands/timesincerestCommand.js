import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function timesincerest(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let timesincerest = playerDB.get(i.name).timeSinceRest;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_timesincerest_0_info"), args.get(locale.get("cmd_args_target")), timesincerest);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), timesincerestCmd.name);
    }
}
function timesincerestSucceed(s, args) {
    printStream.success(s, args);
}
function timesincerestFail(s, args) {
    printStream.failure(s, args);
}
function timesincerestInfo(s, args) {
    printStream.info(s, args);
}
const timesincerestCmd = new Command(locale.get("cmd_name_timesincerest"), locale.get("cmd_description_timesincerest"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], timesincerest, timesincerestSucceed, timesincerestFail, timesincerestInfo, 3);
export { timesincerestCmd };
