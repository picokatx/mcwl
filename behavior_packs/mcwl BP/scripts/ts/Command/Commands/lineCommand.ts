import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO, ARG_NUMBER, ARG_WORLD_POS } from "../CommandParameter.js"
import { Command } from "../Command.js"
import { playerDB, printStream } from "../../Main.js"
import { EntityIterator, Player, world } from "mojang-minecraft"
import { blockIntNamespaces } from "../../Utils/stats/BlocksIntDB.js"
import { MCWLCommandReturn } from "../MCWLCmdReturn.js"
import { locale } from "../../Utils/constants/LocalisationStrings.js"
import { lineMaterial, pointMaterial } from "../../Utils/drawing/material.js"
import { Vec3 } from "../../Utils/data/vec3.js"
import { DataHelper } from "../../Utils/data/DataHelper.js"
function line(
    player: Minecraft.Player,
    args: Map<string,any>,
    subCmd: number): MCWLCommandReturn {
    let pt1:Vec3,pt2:Vec3,pt3:Vec3;
    let blocks:Minecraft.BlockLocation[];
    switch (subCmd) {
        case 0:
            let coords1 = DataHelper.parseCoords(args.get(locale.get("cmd_args_start")),player);
            let coords2 = DataHelper.parseCoords(args.get(locale.get("cmd_args_end")),player);
            pt1 = new Vec3(coords1[0],coords1[1],coords1[2])
            pt2 = new Vec3(coords2[0],coords2[1],coords2[2])
            lineMaterial.apply(
                new Map().set("pt1", new Vec3(pt1.x, pt1.y, pt1.z)).set("pt2", new Vec3(pt2.x, pt2.y, pt2.z)).set("dimension", player.dimension),
                new Map().set("block", args.get(locale.get("cmd_args_block"))).set("dimension", player.dimension)
            )
            return new MCWLCommandReturn(0, locale.get("cmd_return_line_0_success"), args.get(locale.get("cmd_args_block")),pt1.x,pt1.y,pt1.z,pt2.x,pt2.y,pt2.z)
        case 1:
            let temp = player.dimension;
            let temp2 = new Minecraft.BlockLocation(Math.floor(player.location.x),Math.floor(player.location.y),Math.floor(player.location.z));
            let rotCheck = temp.spawnEntity("dpm:rotation_check",temp2);
            player.runCommand(`tp @e[type=dpm:rotation_check] ^ ^1.8 ^${args.get(locale.get("cmd_args_distance"))}`)
            pt1 = new Vec3(Math.floor(player.location.x),Math.floor(player.location.y)-0.5,Math.floor(player.location.z));
            pt2 = new Vec3(Math.floor(rotCheck.location.x),Math.floor(rotCheck.location.y)-0.5,Math.floor(rotCheck.location.z));
            lineMaterial.apply(
                new Map().set("pt1", new Vec3(pt1.x, pt1.y, pt1.z)).set("pt2", new Vec3(pt2.x, pt2.y, pt2.z)).set("dimension", player.dimension),
                new Map().set("block", args.get(locale.get("cmd_args_block"))).set("dimension", player.dimension)
            )
            rotCheck.kill();
            return new MCWLCommandReturn(0, locale.get("cmd_return_line_1_success"), args.get(locale.get("cmd_args_block")),pt1.x,pt1.y,pt1.z,pt2.x,pt2.y,pt2.z)
        default:
            return new MCWLCommandReturn(1, locale.get("cmd_return_default"), lineCmd.name)
    }
}
function lineSucceed(s: string, args: any[]) {
    printStream.success(s, args)
}
function lineFail(s: string, args: any[]) {
    printStream.failure(s, args)
}
function lineInfo(s: string, args: any[]) {
    printStream.info(s, args)
}
const lineCmd = new Command(
    locale.get("cmd_name_line"),
    locale.get("cmd_description_line"),
    [
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_start"), ARG_WORLD_POS,false),
                new CommandParameter(locale.get("cmd_args_end"), ARG_WORLD_POS,false),
                new CommandParameter(locale.get("cmd_args_block"), ARG_STRING,false),
            ]
        ),
        new CommandFormat(
            [
                new CommandParameter(locale.get("cmd_args_distance"), ARG_NUMBER,false),
                new CommandParameter(locale.get("cmd_args_block"), ARG_STRING,false)
            ]
        ),
    ],
    line,
    lineSucceed,
    lineFail,
    lineInfo,
    3
);
export {lineCmd};