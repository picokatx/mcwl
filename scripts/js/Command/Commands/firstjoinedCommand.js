import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function firstjoined(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            let p;
            for (let i of players) {
                p = i;
                if (p.name == args.get(locale.get("cmd_args_target"))) {
                    let firstJoined = playerDB.get(p.name).firstJoined;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_firstjoined_0_info"), args.get(locale.get("cmd_args_target")), firstJoined);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), firstjoinedCmd.name);
    }
}
function firstjoinedSucceed(s, args) {
    printStream.success(s, args);
}
function firstjoinedFail(s, args) {
    printStream.failure(s, args);
}
function firstjoinedInfo(s, args) {
    printStream.info(s, args);
}
const firstjoinedCmd = new Command(locale.get("cmd_name_firstjoined"), locale.get("cmd_description_firstjoined"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], firstjoined, firstjoinedSucceed, firstjoinedFail, firstjoinedInfo, 3);
export { firstjoinedCmd };
