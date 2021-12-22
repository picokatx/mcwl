import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerData } from "../../Utils/data/PlayerData.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
function sudo(
    player: Minecraft.Player,
    args: Map<string, any>,
    subCmd: number) {
    let sudoData: PlayerData
    let sudoTag: PlayerTag
    let sudoDataOn: PlayerData = new PlayerData({ "sudoToggled": true, "sudoName": args.get("name"), "target": "@a" }, "object", "dpm:sudo");
    let sudoTagOn: PlayerTag = new PlayerTag(sudoDataOn);
    switch (subCmd) {
        case 0:
            sudoData = new PlayerData({ "sudoToggled": true, "sudoName": args.get("name"), "target": args.get("target") }, "object", "dpm:sudo");
            sudoTag = new PlayerTag(sudoData);
            sudoTag.write(player);
            return [`${player.name} has been nicked as ${args.get("name")} for ${args.get("target")}`, 0];
        case 1:
            switch (args.get("on|off|toggle")) {
                case "toggle":
                    if (PlayerTag.hasTag(player, "sudo")) {
                        let pData: PlayerData = PlayerTag.read(player, "dpm:sudo")
                        if (pData.data.sudoToggled == true) {
                            sudoData = new PlayerData({ "sudoToggled": false, "sudoName": pData.data.sudoName, "target": pData.data.target }, "object", "dpm:sudo");
                            sudoTag = new PlayerTag(sudoData);
                            sudoTag.write(player);
                            return [`Sudo module has been toggled off`, 0];
                        } else {
                            sudoData = new PlayerData({ "sudoToggled": true, "sudoName": pData.data.sudoName, "target": pData.data.target }, "object", "dpm:sudo");
                            sudoTag = new PlayerTag(sudoData);
                            sudoTag.write(player);
                            return [`Sudo module has been toggled on`, 0];
                        }
                    } else {
                        sudoTagOn.write(player);
                        return [`Sudo module has been toggled on`, 0];
                    }
                case "on":
                    if (PlayerTag.hasTag(player, "sudo")) {
                        let pData: PlayerData = PlayerTag.read(player, "sudo")
                        sudoData = new PlayerData({ "sudoToggled": true, "sudoName": pData.data.sudoName, "target": pData.data.target }, "object", "dpm:sudo");
                        sudoTag = new PlayerTag(sudoData);
                        sudoTag.write(player);
                        return [`Sudo module has been turned on`, 0];
                    } else {
                        sudoData = new PlayerData({ "sudoToggled": true, "sudoName": "DefinitelyNotNicked", "target": "@a" }, "object", "dpm:sudo");
                        sudoTag = new PlayerTag(sudoData);
                        sudoTag.write(player);
                        return [`Sudo module has been turned on with default name and target`, 0];
                    }
                case "off":
                    if (PlayerTag.hasTag(player, "sudo")) {
                        let pData: PlayerData = PlayerTag.read(player, "sudo")
                        sudoData = new PlayerData({ "sudoToggled": false, "sudoName": pData.data.sudoName, "target": pData.data.target }, "object", "dpm:sudo");
                        sudoTag = new PlayerTag(sudoData);
                        sudoTag.write(player);
                        return [`Sudo module has been turned off`, 0];
                    } else {
                        sudoData = new PlayerData({ "sudoToggled": false, "sudoName": "", "target": "@a" }, "object", "dpm:sudo");
                        sudoTag = new PlayerTag(sudoData);
                        sudoTag.write(player);
                        return [`Sudo module has been turned off`, 0];
                    }
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