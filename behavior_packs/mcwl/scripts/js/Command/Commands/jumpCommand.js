import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function jump(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let jump = playerDB.get(i.name).jump;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_jump_0_info"), args.get(locale.get("cmd_args_target")), jump);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), jumpCmd.name);
    }
}
function jumpSucceed(s, args) {
    printStream.success(s, args);
}
function jumpFail(s, args) {
    printStream.failure(s, args);
}
function jumpInfo(s, args) {
    printStream.info(s, args);
}
const jumpCmd = new Command(locale.get("cmd_name_jump"), locale.get("cmd_description_jump"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], jump, jumpSucceed, jumpFail, jumpInfo, 3);
export { jumpCmd };
