import { CommandFormat, CommandParameter, ARG_WORLD_POS, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { pointMaterial } from "../../Utils/drawing/material.js";
import { Vec3 } from "../../Utils/data/vec3.js";
import { printStream } from "../../Main.js";
import { DataHelper } from "../../Utils/data/DataHelper.js";
function setblock(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            const coords = DataHelper.parseCoords(args.get("position"), player);
            pointMaterial.apply(new Map().set("position", new Vec3(coords[0], coords[1], coords[2])), new Map().set("block", args.get("block")));
            return [`${args.get("block")} placed at [${coords[0]},${coords[1]},${coords[2]}]`, 0];
        case 1:
            const loc = new Vec3(player.location.x, player.location.y, player.location.z).floor();
            pointMaterial.apply(new Map().set("position", loc), new Map().set("block", args.get("block")));
            return [`${args.get("block")} placed at [${loc.x}, ${loc.y}, ${loc.z}]`, 0];
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function setblockSucceed(suc) {
    printStream.success(suc);
}
function setblockFail(err) {
    printStream.failure(err);
}
function setblockInfo(inf) {
    printStream.info(inf);
}
const setblockCmd = new Command("setblock", "better than vanilla /setblock", [
    new CommandFormat([
        new CommandParameter("position", ARG_WORLD_POS, false),
        new CommandParameter("block", ARG_STRING, false),
    ]),
    new CommandFormat([
        new CommandParameter("block", ARG_STRING, false),
    ])
], setblock, setblockSucceed, setblockFail, setblockInfo, 3);
export { setblockCmd };
