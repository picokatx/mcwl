import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { SudoEntry } from "../../Utils/stats/SudoEntry.js"
import { Player } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
function sudo(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    let pData: SudoEntry = playerDB.get(player.name).sudo
    switch (subCmd) {
        case 0:
            playerDB.get(player.name).sudo = new SudoEntry(true, args.get(locale.get("cmd_args_name")), args.get(locale.get("cmd_args_target")))
            return new MCWLCommandReturn(0, locale.get("cmd_return_sudo_0_success"), player.name, args.get(locale.get("cmd_args_name")), args.get(locale.get("cmd_args_target")))
        case 1:
            switch (args.get(locale.get("cmd_args_sudoOptions"))) {
                case locale.get("cmd_args_sudo_toggle"):
                    if (pData.sudoToggled) {
                        pData.sudoToggled = false
                        pData.saveToTag(player)
                        return new MCWLCommandReturn(0, locale.get("cmd_return_sudo_1_off_success"))
                    } else {
                        pData.sudoToggled = true
                        pData.saveToTag(player)
                        return new MCWLCommandReturn(0, locale.get("cmd_return_sudo_1_on_success"))
                    }
                case locale.get("cmd_args_sudo_on"):
                    pData.sudoToggled = true
                    pData.saveToTag(player)
                    return new MCWLCommandReturn(0, locale.get("cmd_return_sudo_1_on_success"))
                case locale.get("cmd_args_sudo_off"):
                    pData.sudoToggled = false
                    pData.saveToTag(player)
                    return new MCWLCommandReturn(0, locale.get("cmd_return_sudo_1_off_success"))
            }
            return new MCWLCommandReturn(1, locale.get("cmd_return_sudo_1_failure"), args.get(locale.get("cmd_args_sudoOptions")))
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), sudoCmd.name)
    }
}
function sudoSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function sudoFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function sudoInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const sudoCmd = new Command(
    locale.get("cmd_name_sudo"),
    locale.get("cmd_description_sudo"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_name"), ARG_STRING, false),
                new CommandParameter(locale.get("cmd_args_target"), ARG_STRING, false)
            ]
        ),
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_sudoOptions"), ARG_RADIO([locale.get("cmd_args_sudo_on"), locale.get("cmd_args_sudo_off"), locale.get("cmd_args_sudo_toggle")]), false)
            ]
        )
    ],
    sudo,
    sudoSucceed,
    sudoFail,
    sudoInfo,
    3
)
export { sudoCmd }