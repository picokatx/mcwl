import {CommandFormat,CommandParameter,ARG_STRING, ARG_WORLD_POS, ARG_NUMBER} from "../CommandParameter.js";
import {Command} from "../Command.js";
import { DataHelper } from "../../Utils/data/DataHelper.js";
import { BlockLocation, Player, world } from "mojang-minecraft";
import { printStream } from "../../Main.js";
function spawn(
    player: Player,
    args: Map<string,any>,
    subCmd: number) {
    switch (subCmd) {
        case 0:
            let coords = DataHelper.parseCoords(args.get("position"),player);
            for (let i=0;i<args.get("count");i++) {
                world.getDimension("overworld").spawnEntity(args.get("entity"),new BlockLocation(coords[0],coords[1],coords[2]));
            }
            return [`Spawned ${args.get("count")} ${args.get("entity")} at [${coords[0]}, ${coords[1]}, ${coords[2]}]`,0];
        case 1:
            let loc:BlockLocation = new BlockLocation(Math.floor(player.location.x),Math.floor(player.location.y),Math.floor(player.location.z));
            for (let i=0;i<parseInt(args.get("count"));i++) {
                world.getDimension("overworld").spawnEntity(args.get("entity"),loc);
            }
            return [`Spawned ${args.get("count")} ${args.get("entity")} at [${loc.x}, ${loc.y}, ${loc.z}]`,0];
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`,1];
    }
}
function spawnSucceed(suc:string) {
    printStream.success(suc);
}
function spawnFail(err:string) {
    printStream.failure(err);
}
function spawnInfo(inf:string) {
    printStream.info(inf);
}
const spawnCmd = new Command(
    "spawn",
    "spawns entity",
    [
        new CommandFormat([
            new CommandParameter("entity",ARG_STRING,false),
            new CommandParameter("position",ARG_WORLD_POS,false),
            new CommandParameter("count",ARG_NUMBER,true),
        ]),
        new CommandFormat([
            new CommandParameter("entity",ARG_STRING,false),
            new CommandParameter("count",ARG_STRING,true)
        ]),
    ],
    spawn,
    spawnSucceed,
    spawnFail,
    spawnInfo,
    3
);
export {spawnCmd};