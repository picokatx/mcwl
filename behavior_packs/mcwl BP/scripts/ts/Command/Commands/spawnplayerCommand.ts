import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream, gameTestProto, setSimPlayer} from "../../Main.js"
import { BlockLocation, EntityIterator, Player, world } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"

function spawnplayer(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            setSimPlayer(gameTestProto.spawnSimulatedPlayer(new BlockLocation(0,10,0),"_" + args.get(locale.get("cmd_args_name"))))
            return new MCWLCommandReturn(0, locale.get("cmd_return_spawnplayer_0_success"), args.get(locale.get("cmd_args_name")))
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), spawnplayerCmd.name)
    }
}
function spawnplayerSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function spawnplayerFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function spawnplayerInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const spawnplayerCmd = new Command(
    locale.get("cmd_name_spawnplayer"),
    locale.get("cmd_description_spawnplayer"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_name"), ARG_STRING, false)
            ]
        )
    ],
    spawnplayer,
    spawnplayerSucceed,
    spawnplayerFail,
    spawnplayerInfo,
    3
)
export { spawnplayerCmd }