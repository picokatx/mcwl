import { world, BeforeChatEvent, PlayerJoinEvent, ChatEvent, BlockBreakEvent, TickEvent, Location, Player, BeforeItemUseOnEvent, Items, Block, PlayerLeaveEvent, BlockPlaceEvent, EntityIterator, BeforeDataDrivenEntityTriggerEvent, BeforeItemDefinitionEventSignal, BeforeItemDefinitionTriggeredEvent, ItemStack, BlockLocation, BeforeItemUseEvent, EntityInventoryComponent } from "mojang-minecraft";
import { ModalFormData } from "mojang-minecraft-ui";
import * as GameTest from "mojang-gametest"
import { Command } from "./Command/Command.js";
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
import { SudoEntry } from "./Utils/stats/SudoEntry.js";
import { DamageEntityTypes, DamagePlayerTypes, MCWLNamespaces } from "./Utils/constants/MCWLNamespaces.js";
import { playtimeCmd } from "./Command/Commands/playtimeCommand.js";
import { topCmd } from "./Command/Commands/topCommand.js";
import { helpCmd } from "./Command/Commands/helpCommand.js";
import { playerjoinedCmd } from "./Command/Commands/playerJoinedCommand.js";
import { firstjoinedCmd } from "./Command/Commands/firstjoinedCommand.js";
import { MCWLCommandReturn } from "./Command/MCWLCmdReturn.js";
import { locale } from "./Utils/constants/LocalisationStrings.js";
import { PlayerDB } from "./Utils/data/PlayerDB.js";
import { savedbCmd } from "./Command/Commands/savedbCommand.js";
import { MolangNamespaces } from "./Utils/constants/MolangNamespaces.js";
import { deathsCmd } from "./Command/Commands/deathsCommand.js";
import { lastdiedCmd } from "./Command/Commands/lastdiedCommand.js";
import { jumpCmd } from "./Command/Commands/jumpCommand.js";
import { raidstriggeredCmd } from "./Command/Commands/raidstriggeredCommand.js";
import { timesincerestCmd } from "./Command/Commands/timesincerestCommand.js";
import { sleepinbedCmd } from "./Command/Commands/sleepinbedCommand.js";
import { spawnplayerCmd } from "./Command/Commands/spawnplayerCommand.js";
import { debugCmd } from "./Command/Commands/debugCommand.js";
export let printStream: PrintStream = new PrintStream(world.getDimension("overworld"));
export let playerPrevLocDB: Map<string, Location> = new Map<string, Location>();
export let playerDB: Map<string, PlayerDB> = new Map<string, PlayerDB>()
export let playerPrevHealthDB: Map<string, number> = new Map<string, number>();

export let commands: Command[] = [
    ascendCmd,
    blocksintCmd,
    blocksmodifiedCmd,
    crouchtimeCmd,
    deathsCmd,
    debugCmd,
    descendCmd,
    distancemovedCmd,
    firstjoinedCmd,
    floorCmd,
    gotoCmd,
    helpCmd,
    jumpCmd,
    lastdiedCmd,
    playtimeCmd,
    playerjoinedCmd,
    raidstriggeredCmd,
    savedbCmd,
    setblockCmd,
    sleepinbedCmd,
    spawnCmd,
    spawnplayerCmd,
    sudoCmd,
    timesincerestCmd,
    topCmd,
];
export const cmdPrefix = ",";
export let simPlayer: GameTest.SimulatedPlayer
export function setSimPlayer(p: GameTest.SimulatedPlayer) {
    simPlayer = p
}
export let gameTestProto: GameTest.Test;
GameTest.register("mcwl", "proto", (test) => {
    gameTestProto = test
}).structureName("ComponentTests:platform").maxTicks(9999999)
world.events.beforeItemDefinitionEvent.subscribe((eventData: BeforeItemDefinitionTriggeredEvent) => {
    printStream.println(eventData.eventName);
    if (eventData.source.id == "minecraft:player" && eventData.source.nameTag.charAt(0) != '_') {
        if (eventData.eventName == MCWLNamespaces.menuWand_open) {
            let a: ModalFormData = new ModalFormData();
            a.title("MCWL GUI")
            a.textField("Please Review our addon", "Review")
            a.show(eventData.source as Player).then(a => {
                for (let i of a.formValues) {
                    printStream.println(i)
                }
            })
        }
    }
})
function getNamespaceToken(s: String, start: number, end: number): string {
    return s.split(":").slice(start, end + 1).join(":")
}
enum NamespaceTypes {
    bool = "bool",
    int = "int",
    void = "void"
}
world.events.beforeDataDrivenEntityTriggerEvent.subscribe((eventData: BeforeDataDrivenEntityTriggerEvent) => {
    printStream.println(eventData.id)

    if (eventData.entity.id == "minecraft:player" && getNamespaceToken(eventData.id, 0, 1) == "mcwl:molangquery" && eventData.entity.nameTag.charAt(0) != '_') {
        let namespace: string = getNamespaceToken(eventData.id, 0, 2)
        let type: string = getNamespaceToken(eventData.id, 3, 3)
        let thisPlayerDB: PlayerDB = playerDB.get((eventData.entity as Player).name)

        switch (type) {
            case NamespaceTypes["bool"]:
                let boolValue: boolean = getNamespaceToken(eventData.id, 4, 4) == 'true'
                if (boolValue != null) {
                    thisPlayerDB.molangQueries.set(namespace, boolValue)
                }
                if (namespace == MolangNamespaces.is_alive && boolValue == false) {
                    thisPlayerDB.timeSinceDeath = 0
                    thisPlayerDB.deaths++;
                }
                else if (namespace == MolangNamespaces.is_jumping && boolValue == true) {
                    thisPlayerDB.jump++;
                } else if (namespace == MolangNamespaces.raid_triggered) {
                    thisPlayerDB.raidsTriggered++;
                } else if (namespace == MolangNamespaces.is_sleeping) {
                    thisPlayerDB.sleepInBed++
                    thisPlayerDB.timeSinceRest = 0;
                }
                break
            case NamespaceTypes["int"]:
                let idx: number = parseInt(getNamespaceToken(eventData.id, 4, 4))
                let value: boolean = getNamespaceToken(eventData.id, 5, 5) == 'true'
                thisPlayerDB.health[idx] = value
                break
            case NamespaceTypes["void"]:
                for (let i of Object.values(DamageEntityTypes)) {
                    if (namespace==i) {
                        thisPlayerDB.entitiesKilled.getEntryById(i).count++
                    }
                }
                for (let i of Object.values(DamagePlayerTypes)) {
                    if (namespace==i) {
                        
                    }
                }
        }

    }
})
world.events.playerLeave.subscribe((eventData: PlayerLeaveEvent) => {
    printStream.println(`Hello! I hope you saved your player statistics, because if you didn't they're gone now.`)
})
world.events.playerJoin.subscribe((eventData: PlayerJoinEvent) => {
    if (eventData.player == undefined) {
        return
    }
    PlayerTag.clearTags(eventData.player);
    if (!PlayerTag.hasTag(eventData.player, MCWLNamespaces.playerFirstJoined)) {
        printStream.info(locale.get('player_welcome'), [eventData.player.name])
        playerDB.set(eventData.player.name, new PlayerDB(eventData.player, true))
    } else {
        playerDB.set(eventData.player.name, new PlayerDB(eventData.player, false))
    }
    playerPrevLocDB.set(eventData.player.name, eventData.player.location);
    playerDB.get(eventData.player.name).joined += 1;
})

world.events.beforeItemUseOn.subscribe((eventData: BeforeItemUseOnEvent) => {
    
    if (eventData.source.id == "minecraft:player" && eventData.source.nameTag.charAt(0) != '_') {
        let block: Block = eventData.source.dimension.getBlock(eventData.blockLocation);
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
                } else {
                    for (let j of i[1].itemUsed) {
                        if (Items.get(eventData.item.id) == Items.get(j.id)) {
                            itemEquals = true;
                            break;
                        }
                    }
                }
            } else {
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
                playerDB.get((eventData.source as Player).name).blockInt.add(i[0])
            }
        }
    }
})
function boolArrayToInt(b: boolean[]): number {
    let ret: number = 0;
    for (let i = 0; i < b.length; i++) {
        ret += (b[i] ? 1 : 0) * Math.pow(2, i)
    }
    return ret
}
world.events.tick.subscribe((eventData: TickEvent) => {
    printStream.broadcast();
    let pList: EntityIterator = world.getPlayers();
    for (let i of pList) {
        let p: Player = i as Player
        if (p.name.charAt(0) == '_') {
            continue
        }
        if (!playerPrevLocDB.get(p.name).equals(p.location)) {
            let l: Location = playerPrevLocDB.get(p.name);
            playerDB.get(p.name).distanceTravelled += new Vec3(l.x, l.y, l.z).distanceTo(new Vec3(p.location.x, p.location.y, p.location.z))
            playerPrevLocDB.set(p.name, p.location);
        }

        if (p.isSneaking == true) {
            playerDB.get(p.name).crouchTime++;
        }

        playerDB.get(p.name).playtime++

        playerDB.get(p.name).timeSinceDeath++;

        playerDB.get(p.name).timeSinceRest++

        playerDB.get(p.name).healthVal = boolArrayToInt(playerDB.get(p.name).health)
        playerPrevHealthDB.set(p.name, playerDB.get(p.name).healthVal)
    }
})

world.events.blockBreak.subscribe((eventData: BlockBreakEvent) => {
    let id: string = eventData.brokenBlockPermutation.type.id;
    for (let i of playerDB.get(eventData.player.name).blockMod) {
        if (eventData.player.name.charAt(0) == '_') {
            continue
        }
        i.add(id, locale.get("cmd_args_blocksBroken") as any);
    }
})
world.events.blockPlace.subscribe((eventData: BlockPlaceEvent) => {
    let id: string = eventData.block.id;
    for (let i of playerDB.get(eventData.player.name).blockMod) {
        if (eventData.player.name.charAt(0) == '_') {
            continue
        }
        i.add(id, locale.get("cmd_args_blocksPlaced") as any);
    }
})
world.events.beforeChat.subscribe((eventData: BeforeChatEvent) => {

    if (eventData.message[0] === cmdPrefix) {
        eventData.message = eventData.message.substring(1);
        cmdHandler(eventData);
    } else {
        let rSudoData: SudoEntry = playerDB.get(eventData.sender.name).sudo;
        if (rSudoData.sudoToggled == true) {
            printStream.sudoChat(eventData.message, rSudoData.sudoName, rSudoData.target);
        } else {
            printStream.chat(eventData.message, eventData.sender, world.getPlayers());
        }
    }
    eventData.cancel = true;
});
function cmdHandler(chatEvent: ChatEvent) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    if (cmdIdx == -1) {
        printStream.failure(locale.get("cmd_not_found") as any);
        return
    }
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs: Map<string, any> = new Map()
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])) })
        const ret: MCWLCommandReturn = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
        const retMsg = ret.returnMessage
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
    } else {
        printStream.failure(locale.get("cmd_return_default"));
    }
}
