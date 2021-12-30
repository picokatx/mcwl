import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { Player, world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function playerjoined(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = world.getPlayers()
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let playerJoined: number = PlayerTag.read(i, MCWLNamespaces.playerJoined).data;
                    return [`${args.get("target")} has joined this world ${playerJoined} times`, 0];
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function playerjoinedSucceed(suc: string) {
    printStream.success(suc);
}
function playerjoinedFail(err: string) {
    printStream.failure(err);
}
function playerjoinedInfo(inf: string) {
    printStream.info(inf);
}
const playerjoinedCmd = new Command(
    "playerjoined",
    "Displays number of times player has joined world",
    [
        new CommandFormat(
            [
                new CommandParameter("target", ARG_STRING, false)
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