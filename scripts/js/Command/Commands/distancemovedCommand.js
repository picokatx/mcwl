import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function distancemoved(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let distTravelled = parseInt(PlayerTag.read(i, MCWLNamespaces.distanceTravelled).data);
                    return new MCWLCommandReturn(0, locale.get("cmd_return_distancemoved_0_info"), args.get(locale.get("cmd_args_target")), distTravelled);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), distancemovedCmd.name);
    }
}
function distancemovedSucceed(s, args) {
    printStream.success(s, args);
}
function distancemovedFail(s, args) {
    printStream.failure(s, args);
}
function distancemovedInfo(s, args) {
    printStream.info(s, args);
}
const distancemovedCmd = new Command(locale.get("cmd_name_distancemoved"), locale.get("cmd_description_distancemoved"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
    ])
], distancemoved, distancemovedSucceed, distancemovedFail, distancemovedInfo, 3);
export { distancemovedCmd };
