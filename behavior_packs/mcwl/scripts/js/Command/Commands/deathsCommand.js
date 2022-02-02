import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { playerDB, printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function deaths(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let deaths = playerDB.get(i.name).deaths;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_deaths_0_info"), args.get(locale.get("cmd_args_target")), deaths);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), deathsCmd.name);
    }
}
function deathsSucceed(s, args) {
    printStream.success(s, args);
}
function deathsFail(s, args) {
    printStream.failure(s, args);
}
function deathsInfo(s, args) {
    printStream.info(s, args);
}
const deathsCmd = new Command(locale.get("cmd_name_deaths"), locale.get("cmd_description_deaths"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], deaths, deathsSucceed, deathsFail, deathsInfo, 3);
export { deathsCmd };
