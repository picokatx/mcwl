import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { SudoEntry } from "../../Utils/stats/SudoEntry.js";
import { MCWLNamespaces } from "../../Utils/constants/MCWLNamespaces.js";
import { Player } from "mojang-minecraft";
function sudo(
    player: Player,
    args: Map<string, any>,
    subCmd: number) {
    let pData: SudoEntry = Object.assign(new SudoEntry(),PlayerTag.read(player, MCWLNamespaces.sudo).data);
    //printStream.println(pData);
    //printStream.println(PlayerTag.read(player, "dpm:sudo"));
    switch (subCmd) {
        case 0:
            new SudoEntry(true,args.get("name"),args.get("target")).saveToTag(player);
            return [`${player.name} has been nicked as ${args.get("name")} for ${args.get("target")}`, 0];
        case 1:
            switch (args.get("on|off|toggle")) {
                case "toggle":
                    if (pData.sudoToggled) {
                        pData.sudoToggled = false;
                        pData.saveToTag(player);
                        return [`Sudo module has been toggled off`, 0];
                    } else {
                        pData.sudoToggled = true;
                        pData.saveToTag(player);
                        return [`Sudo module has been toggled on`, 0];
                    }
                case "on":
                    pData.sudoToggled = true;
                    pData.saveToTag(player);
                    return [`Sudo module has been toggled on`, 0];
                case "off":
                    pData.sudoToggled = false;
                    pData.saveToTag(player);
                    return [`Sudo module has been toggled off`, 0];
            }
            return [`Unexpected '${args.get("on|off|toggle")}' at parameter 1`, 1];
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function sudoSucceed(suc: string) {
    printStream.success(suc);
}
function sudoFail(err: string) {
    printStream.failure(err);
}
function sudoInfo(inf: string) {
    printStream.info(inf);
}
const sudoCmd = new Command(
    "sudo",
    "changes name shown in chat",
    [
        new CommandFormat(
            [
                new CommandParameter("name", ARG_STRING, false),
                new CommandParameter("target", ARG_STRING, false)
            ]
        ),
        new CommandFormat(
            [
                new CommandParameter("on|off|toggle", ARG_RADIO(["on", "off", "toggle"]), false)
            ]
        )
    ],
    sudo,
    sudoSucceed,
    sudoFail,
    sudoInfo,
    3
);
export { sudoCmd };