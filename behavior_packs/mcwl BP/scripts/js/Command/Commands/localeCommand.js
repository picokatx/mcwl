import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
import { playerDB, printStream } from "../../Main.js";
function language(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            playerDB.get(args.get(locale.get("cmd_args_target"))).write();
            return new MCWLCommandReturn(0, locale.get("cmd_return_language_0_info"));
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), languageCmd.name);
    }
}
function languageSucceed(s, args) {
    printStream.success(s, args);
}
function languageFail(s, args) {
    printStream.failure(s, args);
}
function languageInfo(s, args) {
    printStream.info(s, args);
}
const languageCmd = new Command(locale.get("cmd_name_language"), locale.get("cmd_description_language"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], language, languageSucceed, languageFail, languageInfo, 3);
export { languageCmd };
