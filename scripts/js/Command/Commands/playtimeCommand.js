import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function playtime(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let playTime = playerDB.get(i.name).playtime;
                    ;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_playtime_0_info"), args.get(locale.get("cmd_args_target")), playTime);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), playtimeCmd.name);
    }
}
function playtimeSucceed(s, args) {
    printStream.success(s, args);
}
function playtimeFail(s, args) {
    printStream.failure(s, args);
}
function playtimeInfo(s, args) {
    printStream.info(s, args);
}
const playtimeCmd = new Command(locale.get("cmd_name_playtime"), locale.get("cmd_description_playtime"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], playtime, playtimeSucceed, playtimeFail, playtimeInfo, 3);
export { playtimeCmd };
