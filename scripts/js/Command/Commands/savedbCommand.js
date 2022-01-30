import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
import { playerDB, printStream } from "../../Main.js";
function savedb(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            playerDB.get(args.get(locale.get("cmd_args_target"))).write();
            return new MCWLCommandReturn(0, locale.get("cmd_return_savedb_0_info"));
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), savedbCmd.name);
    }
}
function savedbSucceed(s, args) {
    printStream.success(s, args);
}
function savedbFail(s, args) {
    printStream.failure(s, args);
}
function savedbInfo(s, args) {
    printStream.info(s, args);
}
const savedbCmd = new Command(locale.get("cmd_name_savedb"), locale.get("cmd_description_savedb"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], savedb, savedbSucceed, savedbFail, savedbInfo, 3);
export { savedbCmd };
