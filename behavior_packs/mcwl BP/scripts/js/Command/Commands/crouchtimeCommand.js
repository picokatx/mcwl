import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function crouchtime(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let sneakTime = playerDB.get(i.name).crouchTime;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_crouchtime_0_info"), args.get(locale.get("cmd_args_target")), sneakTime);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), crouchtimeCmd.name);
    }
}
function crouchtimeSucceed(s, args) {
    printStream.success(s, args);
}
function crouchtimeFail(s, args) {
    printStream.failure(s, args);
}
function crouchtimeInfo(s, args) {
    printStream.info(s, args);
}
const crouchtimeCmd = new Command(locale.get("cmd_name_crouchtime"), locale.get("cmd_description_crouchtime"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], crouchtime, crouchtimeSucceed, crouchtimeFail, crouchtimeInfo, 3);
export { crouchtimeCmd };
