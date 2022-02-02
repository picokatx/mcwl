import { CommandFormat, CommandParameter, ARG_WORLD_POS, ARG_STRING } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { pointMaterial } from "../../Utils/drawing/material.js"
import { Vec3 } from "../../Utils/data/vec3.js"
import { printStream } from "../../Main.js"
import { DataHelper } from "../../Utils/data/DataHelper.js"
import { Player } from "mojang-minecraft"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"

function setblock(
    player: Player,
    args: Map<string, any>,
    subCmd: number): MCWLCommandReturn {
    switch (subCmd) {
        case 0:
            let coords = DataHelper.parseCoords(args.get(locale.get("cmd_args_position")), player)
            if (coords == [] || coords == null) {
                return new MCWLCommandReturn(1, locale.get("cmd_return_default"), setblockCmd.name)
            }
            try {
                pointMaterial.apply(
                    new Map().set("position", new Vec3(coords[0], coords[1], coords[2])),
                    new Map().set("block", args.get(locale.get("cmd_args_block")))
                )
            } catch {
                return new MCWLCommandReturn(1, locale.get("cmd_return_default"), setblockCmd.name)
            }
            return new MCWLCommandReturn(0, locale.get("cmd_return_setblock_0_success"), args.get(locale.get("cmd_args_block")), coords[0], coords[1], coords[2])
        case 1:
            let loc = new Vec3(player.location.x, player.location.y, player.location.z).floor()
            try {
                pointMaterial.apply(
                    new Map().set("position", loc),
                    new Map().set("block", args.get(locale.get("cmd_args_block")))
                )
            } catch {
                return new MCWLCommandReturn(1, locale.get("cmd_return_default"), setblockCmd.name)
            }
            return new MCWLCommandReturn(0, locale.get("cmd_return_setblock_0_success"), args.get(locale.get("cmd_args_block")), loc.x, loc.y, loc.z)
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), setblockCmd.name)
    }
}
function setblockSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function setblockFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function setblockInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const setblockCmd = new Command(
    locale.get("cmd_name_setblock"),
    locale.get("cmd_description_setblock"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_position"), ARG_WORLD_POS, false),
                new CommandParameter(locale.get("cmd_args_block"), ARG_STRING, false),
            ]
        ),
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_block"), ARG_STRING, false),
            ]
        )
    ],
    setblock,
    setblockSucceed,
    setblockFail,
    setblockInfo,
    3
)
export { setblockCmd }