import { world, Items } from "mojang-minecraft";
import { sudoCmd } from "./Command/Commands/sudoCommand.js";
import { PlayerTag } from "./Utils/data/PlayerTag.js";
import { PrintStream } from "./Utils/logging/PrintStream.js";
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
import { blockIntNamespaces } from "./Utils/stats/BlocksIntDB.js";
import { blocksintCmd } from "./Command/Commands/blocksintCommand.js";
import { MCWLNamespaces } from "./Utils/constants/MCWLNamespaces.js";
import { playtimeCmd } from "./Command/Commands/playtimeCommand.js";
import { topCmd } from "./Command/Commands/topCommand.js";
import { helpCmd } from "./Command/Commands/helpCommand.js";
import { playerjoinedCmd } from "./Command/Commands/playerJoinedCommand.js";
import { firstjoinedCmd } from "./Command/Commands/firstjoinedCommand.js";
import { locale } from "./Utils/constants/LocalisationStrings.js";
import { PlayerDB } from "./Utils/data/PlayerDB.js";
import { savedbCmd } from "./Command/Commands/savedbCommand.js";
import { MolangNamespaces, molangQueries } from "./Utils/constants/MolangNamespaces.js";
export let printStream = new PrintStream(world.getDimension("overworld"));
export let playerPrevLocDB = new Map();
export let playerDB = new Map();
export let commands = [
    ascendCmd,
    blocksintCmd,
    blocksmodifiedCmd,
    crouchtimeCmd,
    descendCmd,
    distancemovedCmd,
    firstjoinedCmd,
    floorCmd,
    gotoCmd,
    helpCmd,
    playtimeCmd,
    playerjoinedCmd,
    topCmd,
    savedbCmd,
    setblockCmd,
    spawnCmd,
    sudoCmd
];
export const cmdPrefix = ",";
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData) => {
    if (eventData.entity.id == "minecraft:player") {
        printStream.println(eventData.id);
        let namespace = eventData.id.split(':');
        molangQueries.set(namespace.slice(0, 3).join(":"), namespace[3] === 'true');
    }
});
world.events.playerLeave.subscribe((eventData) => {
    printStream.println(`Hello! I hope you saved your player statistics, because if you didn't they're gone now.`);
});
world.events.playerJoin.subscribe((eventData) => {
    if (!PlayerTag.hasTag(eventData.player, MCWLNamespaces.playerFirstJoined)) {
        printStream.info(locale.get('player_welcome'), [eventData.player.name]);
        playerDB.set(eventData.player.name, new PlayerDB(eventData.player, true));
    }
    else {
        playerDB.set(eventData.player.name, new PlayerDB(eventData.player, false));
    }
    playerPrevLocDB.set(eventData.player.name, eventData.player.location);
    playerDB.get(eventData.player.name).joined += 1;
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
                playerDB.get(eventData.source.name).blockInt.add(i[0]);
            }
        }
    }
});
world.events.tick.subscribe((eventData) => {
    printStream.broadcast();
    let pList = world.getPlayers();
    for (let i of pList) {
        let p = i;
        if (!playerPrevLocDB.get(p.name).equals(p.location)) {
            let l = playerPrevLocDB.get(p.name);
            playerDB.get(p.name).distanceTravelled += new Vec3(l.x, l.y, l.z).distanceTo(new Vec3(p.location.x, p.location.y, p.location.z));
            playerPrevLocDB.set(p.name, p.location);
        }
        if (p.isSneaking == true) {
            playerDB.get(p.name).crouchTime++;
        }
        playerDB.get(p.name).playtime++;
    }
});
world.events.blockBreak.subscribe((eventData) => {
    let id = eventData.brokenBlockPermutation.type.id;
    for (let i of playerDB.get(eventData.player.name).blockMod) {
        i.add(id, locale.get("cmd_args_blocksBroken"));
    }
});
world.events.blockPlace.subscribe((eventData) => {
    let id = eventData.block.id;
    for (let i of playerDB.get(eventData.player.name).blockMod) {
        i.add(id, locale.get("cmd_args_blocksPlaced"));
    }
});
world.events.beforeChat.subscribe((eventData) => {
    printStream.println(molangQueries.get(MolangNamespaces.is_in_water_or_rain));
    if (eventData.message[0] === cmdPrefix) {
        eventData.message = eventData.message.substring(1);
        cmdHandler(eventData);
    }
    else {
        let rSudoData = playerDB.get(eventData.sender.name).sudo;
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
        printStream.failure(locale.get("cmd_not_found"));
        return;
    }
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs = new Map();
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])); });
        const ret = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
        const retMsg = ret.returnMessage;
        const errCode = ret.errorCode;
        const retArgs = ret.messageArgs;
        switch (errCode) {
            case 0:
                commands[cmdIdx].success(retMsg, retArgs);
                break;
            case 1:
                commands[cmdIdx].failure(retMsg, retArgs);
                break;
            case 2:
                commands[cmdIdx].info(retMsg, retArgs);
                break;
        }
    }
    else {
        printStream.failure(locale.get("cmd_return_default"));
    }
}
