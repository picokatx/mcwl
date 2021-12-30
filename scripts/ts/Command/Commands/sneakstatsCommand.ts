import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { Player, world } from "mojang-minecraft";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
function sneakstats(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let players: Player[] = world.getPlayers()
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let sneakTime: number = PlayerTag.read(i, MCWLNamespaces.sneakDuration).data;
                    return [`${args.get("target")} has crouched a total of ${sneakTime} game ticks`, 0];
                }
            }

        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function sneakstatsSucceed(suc: string) {
    printStream.success(suc);
}
function sneakstatsFail(err: string) {
    printStream.failure(err);
}
function sneakstatsInfo(inf: string) {
    printStream.info(inf);
}
const sneakstatsCmd = new Command(
    "crouchtime",
    "Displays sneak time of player in ticks",
    [
        new CommandFormat(
            [
                new CommandParameter("target", ARG_STRING, false)
            ]
        )
    ],
    sneakstats,
    sneakstatsSucceed,
    sneakstatsFail,
    sneakstatsInfo,
    3
);
export { sneakstatsCmd };