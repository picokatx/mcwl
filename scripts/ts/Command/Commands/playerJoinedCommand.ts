import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { Player, world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
import { MCWLCommandReturn } from "../MCWLCmdReturn.js";
import { locale } from "../../Utils/constants/LocalisationStrings.js";
function playerjoined(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let players: Player[] = world.getPlayers()
            for (let i of players) {
                if (i.name == args.get(locale.get("cmd_args_target"))) {
                    let playerJoined: number = parseInt(PlayerTag.read(i, MCWLNamespaces.playerJoined).data as string);
                    return new MCWLCommandReturn(0, locale.get("cmd_return_playerjoined_0_info"), args.get(locale.get("cmd_args_target")), playerJoined);
                }
            }
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), playerjoinedCmd.name);
    }
}
function playerjoinedSucceed(s: string, args: any[]) {
    printStream.success(s, args);
}
function playerjoinedFail(s: string, args: any[]) {
    printStream.failure(s, args);
}
function playerjoinedInfo(s: string, args: any[]) {
    printStream.info(s, args);
}
const playerjoinedCmd = new Command(
    locale.get("cmd_name_playerjoined"),
    locale.get("cmd_description_playerjoined"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        )
    ],
    playerjoined,
    playerjoinedSucceed,
    playerjoinedFail,
    playerjoinedInfo,
    3
);
export { playerjoinedCmd };