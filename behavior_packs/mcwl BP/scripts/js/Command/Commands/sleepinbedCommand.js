import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function sleepinbed(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let sleepinbed = playerDB.get(i.name).sleepInBed;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_sleepinbed_0_info"), args.get(locale.get("cmd_args_target")), sleepinbed);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), sleepinbedCmd.name);
    }
}
function sleepinbedSucceed(s, args) {
    printStream.success(s, args);
}
function sleepinbedFail(s, args) {
    printStream.failure(s, args);
}
function sleepinbedInfo(s, args) {
    printStream.info(s, args);
}
const sleepinbedCmd = new Command(locale.get("cmd_name_sleepinbed"), locale.get("cmd_description_sleepinbed"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], sleepinbed, sleepinbedSucceed, sleepinbedFail, sleepinbedInfo, 3);
export { sleepinbedCmd };
