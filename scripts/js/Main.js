import { world } from "mojang-minecraft";
import { sudoCmd } from "./Command/Commands/sudoCommand.js";
import { PlayerData } from "./Utils/data/PlayerData.js";
import { PlayerTag } from "./Utils/data/PlayerTag.js";
import { PrintStream } from "./Utils/logging/PrintStream.js";
import { BlockStatDB } from "./Utils/stats/BlockStatDB.js";
import { blockstatsCmd } from "./Command/Commands/blockstatsCommand.js";
import { sneakstatsCmd } from "./Command/Commands/sneakstatsCommand.js";
import { Vec3 } from "./Utils/data/vec3.js";
import { distmovedstatsCmd } from "./Command/Commands/distTravelledCommand.js";
import { DataHelper } from "./Utils/data/DataHelper.js";
import { spawnCmd } from "./Command/Commands/spawnCommand.js";
import { gotoCmd } from "./Command/Commands/gotoCommand.js";
import { setblockCmd } from "./Command/Commands/setblockCommand.js";
import { ascendCmd } from "./Command/Commands/ascendCommand.js";
import { descendCmd } from "./Command/Commands/descendCommand.js";
import { floorCmd } from "./Command/Commands/floorCommand.js";
export let printStream = new PrintStream(world.getDimension("overworld"));
export let playerBlockSelection = [];
export let playerBlockStatDB = new Map();
export let playerBlocksIntDB = new Map();
export let playerCrouchTimeDB = new Map();
export let playerDistTravelledDB = new Map();
export let playerPrevLocDB = new Map();
let operators = [
    { "name": "Rscraft388", "permissionLevel": 99 },
    { "name": "Dunnowtsi07", "permissionLevel": 0 }
];
let commands = [
    sudoCmd,
    blockstatsCmd,
    sneakstatsCmd,
    distmovedstatsCmd,
    spawnCmd,
    gotoCmd,
    ascendCmd,
    setblockCmd,
    descendCmd,
    floorCmd
];
export const cmdPrefix = ",";
world.events.playerJoin.subscribe((eventData) => {
    PlayerTag.clearTags(eventData.player);
    if (!PlayerTag.hasTag(eventData.player, "dpm:sneakTime")) {
        playerCrouchTimeDB.set(eventData.player, 0);
    }
    else {
        playerCrouchTimeDB.set(eventData.player, parseInt(PlayerTag.read(eventData.player, "dpm:sneakTime").data));
    }
    playerPrevLocDB.set(eventData.player, eventData.player.location);
    if (!PlayerTag.hasTag(eventData.player, "dpm:distTravelled")) {
        playerDistTravelledDB.set(eventData.player, 0);
    }
    else {
        playerDistTravelledDB.set(eventData.player, parseInt(PlayerTag.read(eventData.player, "dpm:distTravelled").data));
    }
    if (!PlayerTag.hasTag(eventData.player, "dpm:sudo")) {
        let sudoData = new PlayerData({ "sudoToggled": false, "sudoName": "pico", "target": "@a" }, "object", "dpm:sudo");
        let sudoTag = new PlayerTag(sudoData);
        sudoTag.write(eventData.player);
    }
});
world.events.beforeItemUseOn.subscribe((eventData) => {
    printStream.println(DataHelper.isContainerEmpty(eventData.source.dimension.getBlock(eventData.blockLocation)));
    eventData.source.dimension.getBlock(eventData.blockLocation).permutation.getAllProperties().forEach((p) => {
        printStream.println(p.name);
    });
});
world.events.tick.subscribe((eventData) => {
    let pList = world.getPlayers();
    for (let p of pList) {
        if (!playerPrevLocDB.get(p).equals(p.location)) {
            let l = playerPrevLocDB.get(p);
            playerDistTravelledDB.set(p, playerDistTravelledDB.get(p) + new Vec3(l.x, l.y, l.z).distanceTo(new Vec3(p.location.x, p.location.y, p.location.z)));
            playerPrevLocDB.set(p, p.location);
        }
        let distTravelledData = new PlayerData(playerDistTravelledDB.get(p), "number", "dpm:distTravelled");
        let distTravelledTag = new PlayerTag(distTravelledData);
        distTravelledTag.write(p);
        if (p.isSneaking == true) {
            playerCrouchTimeDB.set(p, playerCrouchTimeDB.get(p) + 1);
        }
        let blockData = new PlayerData(playerCrouchTimeDB.get(p), "number", "dpm:sneakTime");
        let blockTag = new PlayerTag(blockData);
        blockTag.write(p);
        BlockStatDB.getBlockAtPointer(p);
    }
});
world.events.blockBreak.subscribe((eventData) => {
});
world.events.beforeChat.subscribe((eventData) => {
    eventData.cancel = true;
    if (eventData.message[0] === cmdPrefix) {
        let opIdx = operators.map(a => a.name).indexOf(eventData.sender.name);
        eventData.message = eventData.message.substring(1);
        cmdHandler(eventData, operators[opIdx].permissionLevel);
    }
    else {
        let rSudoData = PlayerTag.read(eventData.sender, "dpm:sudo");
        if (rSudoData.data.sudoToggled == true) {
            printStream.sudoChat(eventData.message, rSudoData.data.sudoName, rSudoData.data.target);
        }
        else {
            printStream.chat(eventData.message, eventData.sender);
        }
    }
});
function cmdHandler(chatEvent, opLevel) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    printStream.println(subCmdIdx);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs = new Map();
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])); });
        const retArgs = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
        const retMsg = retArgs[0];
        const errCode = retArgs[1];
        switch (errCode) {
            case 0:
                commands[cmdIdx].success(retMsg);
                break;
            case 1:
                commands[cmdIdx].failure(retMsg);
                break;
            case 2:
                commands[cmdIdx].info(retMsg);
                break;
        }
    }
}
