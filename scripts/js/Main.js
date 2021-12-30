import { world, Items } from "mojang-minecraft";
import { sudoCmd } from "./Command/Commands/sudoCommand.js";
import { PlayerData } from "./Utils/data/PlayerData.js";
import { PlayerTag } from "./Utils/data/PlayerTag.js";
import { PrintStream } from "./Utils/logging/PrintStream.js";
import { BlockStatDB } from "./Utils/stats/BlockStatDB.js";
import { blocksmodifiedCmd } from "./Command/Commands/blocksmodifiedCommand.js";
import { crouchtimeCmd } from "./Command/Commands/crouchtimeCommand.js";
import { Vec3 } from "./Utils/data/vec3.js";
import { distancemovedCmd } from "./Command/Commands/distancemovedCommand.js";
import { spawnCmd } from "./Command/Commands/spawnCommand.js";
import { gotoCmd } from "./Command/Commands/gotoCommand.js";
import { setblockCmd } from "./Command/Commands/setblockCommand.js";
import { ascendCmd } from "./Command/Commands/ascendCommand.js";
import { descendCmd } from "./Command/Commands/descendCommand.js";
import { floorCmd } from "./Command/Commands/floorCommand.js";
import { blockIntNamespaces, BlocksIntDB } from "./Utils/stats/BlocksIntDB.js";
import { blocksintCmd } from "./Command/Commands/blocksintCommand.js";
import { SudoEntry } from "./Utils/stats/SudoEntry.js";
import { MCWLNamespaces } from "./Utils/constants/MCWLNamespaces.js";
import { playtimeCmd } from "./Command/Commands/playtimeCommand.js";
import { topCmd } from "./Command/Commands/topCommand.js";
import { helpCmd } from "./Command/Commands/helpCommand.js";
import { playerjoinedCmd } from "./Command/Commands/playerjoinedCommand.js";
export let printStream = new PrintStream(world.getDimension("overworld"));
export let playerBlockSelection = [];
export let playerBlockStatDB = new Map();
export let playerBlockStatDB1 = new Map();
export let playerBlockStatDB2 = new Map();
export let playerBlockStatDB3 = new Map();
export let playerBlockStatDB4 = new Map();
export let playerBlocksIntDB = new Map();
export let playerCrouchTimeDB = new Map();
export let playerJoinedDB = new Map();
export let playerDistTravelledDB = new Map();
export let playerPrevLocDB = new Map();
export let playerPlaytimeDB = new Map();
export let playerSudoDB = new Map();
export let commands = [
    ascendCmd,
    blocksintCmd,
    blocksmodifiedCmd,
    descendCmd,
    distancemovedCmd,
    floorCmd,
    gotoCmd,
    helpCmd,
    playtimeCmd,
    playerjoinedCmd,
    topCmd,
    sudoCmd,
    crouchtimeCmd,
    spawnCmd,
    setblockCmd,
];
export const cmdPrefix = ",";
function initializeDB(playerMap, player, tagName, defaultValue) {
    if (!PlayerTag.hasTag(player, tagName)) {
        playerMap.set(player, defaultValue);
        let data;
        if (typeof defaultValue == 'object') {
            data = new PlayerData(defaultValue.db, "object", tagName);
        }
        else {
            data = new PlayerData(defaultValue, typeof defaultValue, tagName);
        }
        let tag = new PlayerTag(data);
        tag.write(player);
    }
    else {
        if (typeof defaultValue == 'number') {
            playerMap.set(player, parseInt(PlayerTag.read(player, tagName).data));
        }
        else if (typeof defaultValue == 'boolean') {
            let b = PlayerTag.read(player, tagName).data;
            if (b == "true") {
                playerMap.set(player, true);
            }
            else {
                playerMap.set(player, false);
            }
        }
        else if (typeof defaultValue == 'object') {
            playerMap.set(player, defaultValue.constructor(player, (PlayerTag.read(player, tagName).data)));
        }
        else if (typeof defaultValue == 'string') {
            playerMap.set(player, PlayerTag.read(player, tagName).data);
        }
    }
}
function saveDBToTag(db, player, type, tagName) {
    let data = new PlayerData(db, type, tagName);
    let tag = new PlayerTag(data);
    tag.write(player);
}
function getPlayer(name) {
    for (let i of world.getPlayers()) {
        if (i.name == name) {
            return i;
        }
    }
}
world.events.playerJoin.subscribe((eventData) => {
    playerPrevLocDB.set(eventData.player, eventData.player.location);
    initializeDB(playerCrouchTimeDB, eventData.player, MCWLNamespaces.sneakDuration, 0);
    initializeDB(playerDistTravelledDB, eventData.player, MCWLNamespaces.distanceTravelled, 0);
    initializeDB(playerPlaytimeDB, eventData.player, MCWLNamespaces.playtime, 0);
    initializeDB(playerJoinedDB, eventData.player, MCWLNamespaces.playerJoined, 0);
    new BlocksIntDB().initialize(playerBlocksIntDB, eventData.player, new BlocksIntDB());
    new SudoEntry(false, "pico", "@a").initialize(playerSudoDB, eventData.player);
    new BlockStatDB(0, 5).initialize(playerBlockStatDB, eventData.player, new BlockStatDB(0, 5), 0);
    new BlockStatDB(1, 5).initialize(playerBlockStatDB1, eventData.player, new BlockStatDB(1, 5), 1);
    new BlockStatDB(2, 5).initialize(playerBlockStatDB2, eventData.player, new BlockStatDB(2, 5), 2);
    new BlockStatDB(3, 5).initialize(playerBlockStatDB3, eventData.player, new BlockStatDB(3, 5), 3);
    new BlockStatDB(4, 5).initialize(playerBlockStatDB4, eventData.player, new BlockStatDB(4, 5), 4);
    playerJoinedDB.set(eventData.player, playerJoinedDB.get(eventData.player) + 1);
    saveDBToTag(playerJoinedDB.get(eventData.player), eventData.player, "number", MCWLNamespaces.playerJoined);
});
world.events.beforeItemUseOn.subscribe((eventData) => {
    if (eventData.source.id == "minecraft:player") {
        let block = eventData.source.dimension.getBlock(eventData.blockLocation);
        for (let i of blockIntNamespaces.entries()) {
            let blockEquals = false;
            let itemEquals = false;
            let blockCheckEquals = false;
            let itemCheckEquals = false;
            for (let j of i[1].targetBlock) {
                if (block.type == j.type) {
                    blockEquals = true;
                    break;
                }
            }
            if (eventData.item != null) {
                if (i[1].any == true) {
                    itemEquals = true;
                }
                else {
                    for (let j of i[1].itemUsed) {
                        if (Items.get(eventData.item.id) == Items.get(j.id)) {
                            itemEquals = true;
                            break;
                        }
                    }
                }
            }
            else {
                if (i[1].any == true) {
                    itemEquals = true;
                }
            }
            if (blockEquals) {
                blockCheckEquals = i[1].blockDataCheck(block);
            }
            if (itemEquals) {
                itemCheckEquals = i[1].itemDataCheck(eventData.item);
            }
            if (blockCheckEquals && itemCheckEquals) {
                let bInt = playerBlocksIntDB.get(eventData.source);
                bInt.add(i[0]);
                bInt.saveToTag(eventData.source);
            }
        }
    }
});
world.events.playerLeave.subscribe((eventData) => {
});
world.events.tick.subscribe((eventData) => {
    let pList = world.getPlayers();
    for (let p of pList) {
        if (!playerPrevLocDB.get(p).equals(p.location)) {
            let l = playerPrevLocDB.get(p);
            playerDistTravelledDB.set(p, playerDistTravelledDB.get(p) + new Vec3(l.x, l.y, l.z).distanceTo(new Vec3(p.location.x, p.location.y, p.location.z)));
            playerPrevLocDB.set(p, p.location);
            saveDBToTag(playerDistTravelledDB.get(p), p, "number", MCWLNamespaces.distanceTravelled);
        }
        if (p.isSneaking == true) {
            playerCrouchTimeDB.set(p, playerCrouchTimeDB.get(p) + 1);
            saveDBToTag(playerCrouchTimeDB.get(p), p, "number", MCWLNamespaces.sneakDuration);
        }
        playerPlaytimeDB.set(p, playerPlaytimeDB.get(p) + 1);
        saveDBToTag(playerPlaytimeDB.get(p), p, "number", MCWLNamespaces.playtime);
        BlockStatDB.getBlockAtPointer(p);
    }
});
world.events.blockBreak.subscribe((eventData) => {
    let id = BlockStatDB.getBlockBroken(eventData.player);
    playerBlockStatDB.get(eventData.player).add(id, "blocksBroken");
    playerBlockStatDB.get(eventData.player).saveToTag(eventData.player, 0);
    playerBlockStatDB1.get(eventData.player).add(id, "blocksBroken");
    playerBlockStatDB1.get(eventData.player).saveToTag(eventData.player, 1);
    playerBlockStatDB2.get(eventData.player).add(id, "blocksBroken");
    playerBlockStatDB2.get(eventData.player).saveToTag(eventData.player, 2);
    playerBlockStatDB3.get(eventData.player).add(id, "blocksBroken");
    playerBlockStatDB3.get(eventData.player).saveToTag(eventData.player, 3);
    playerBlockStatDB4.get(eventData.player).add(id, "blocksBroken");
    playerBlockStatDB4.get(eventData.player).saveToTag(eventData.player, 4);
});
world.events.blockPlace.subscribe((eventData) => {
    let id = eventData.block.id;
    playerBlockStatDB.get(eventData.player).add(id, "blocksPlaced");
    playerBlockStatDB.get(eventData.player).saveToTag(eventData.player, 0);
    playerBlockStatDB1.get(eventData.player).add(id, "blocksPlaced");
    playerBlockStatDB1.get(eventData.player).saveToTag(eventData.player, 1);
    playerBlockStatDB2.get(eventData.player).add(id, "blocksPlaced");
    playerBlockStatDB2.get(eventData.player).saveToTag(eventData.player, 2);
    playerBlockStatDB3.get(eventData.player).add(id, "blocksPlaced");
    playerBlockStatDB3.get(eventData.player).saveToTag(eventData.player, 3);
    playerBlockStatDB4.get(eventData.player).add(id, "blocksPlaced");
    playerBlockStatDB4.get(eventData.player).saveToTag(eventData.player, 4);
});
world.events.beforeChat.subscribe((eventData) => {
    if (eventData.message[0] === cmdPrefix) {
        eventData.message = eventData.message.substring(1);
        cmdHandler(eventData);
    }
    else {
        let rSudoData = Object.assign(new SudoEntry(), PlayerTag.read(eventData.sender, MCWLNamespaces.sudo).data);
        if (rSudoData.sudoToggled == true) {
            printStream.sudoChat(eventData.message, rSudoData.sudoName, rSudoData.target);
        }
        else {
            printStream.chat(eventData.message, eventData.sender, world.getPlayers());
        }
    }
    eventData.cancel = true;
});
function cmdHandler(chatEvent) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    if (cmdIdx == -1) {
        printStream.failure(`Command not found. Use ,help for a list of all commands.`);
        return;
    }
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
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
    else {
        printStream.failure(`Command Format Invalid. Use ,help for a list of all command formats.`);
    }
}
