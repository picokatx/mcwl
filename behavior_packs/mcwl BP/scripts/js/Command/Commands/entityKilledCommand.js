import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { printStream, playerDB } from "../../Main.js";
import { world } from "mojang-minecraft";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
import { DamageEntityTypes } from "../../Utils/constants/MCWLNamespaces.js";
function entitykilled(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            let players = world.getPlayers();
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let health = playerDB.get(i.name).entitiesKilled.getEntryById(DamageEntityTypes.fatal_damage_any + args.get(locale.get("cmd_args_name"))).count;
                    return new MCWLCommandReturn(0, locale.get("cmd_return_entitykilled_0_info"), args.get(locale.get("cmd_args_target")), health, args.get(locale.get("cmd_args_name")));
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), entitykilledCmd.name);
    }
}
function entitykilledSucceed(s, args) {
    printStream.success(s, args);
}
function entitykilledFail(s, args) {
    printStream.failure(s, args);
}
function entitykilledInfo(s, args) {
    printStream.info(s, args);
}
const entitykilledCmd = new Command(locale.get("cmd_name_entitykilled"), locale.get("cmd_description_entitykilled"), [
    new CommandFormat([
        new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false),
        new CommandParameter(locale.get("cmd_args_name"), ARG_STRING, false)
    ])
], entitykilled, entitykilledSucceed, entitykilledFail, entitykilledInfo, 3);
export { entitykilledCmd };
