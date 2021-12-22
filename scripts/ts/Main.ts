import { world, BeforeChatEvent, PlayerJoinEvent, Dimension, ChatEvent, BlockBreakEvent, EntityMovementGlideComponent, TickEvent, Location, BlockLocation, Player, BlockRaycastOptions, ItemUseEvent, Block, BeforeItemUseOnEvent, BlockInventoryComponentContainer, BlockInventoryComponent, BlockRecordPlayerComponent, MinecraftBlockTypes, BlockType, BeforeItemUseEvent } from "mojang-minecraft";
import { Command } from "./Command/Command.js";
import { sudoCmd } from "./Command/Commands/sudoCommand.js";
import { PlayerData } from "./Utils/data/PlayerData.js";
import { PlayerTag } from "./Utils/data/PlayerTag.js";
import { Console } from "./Utils/logging/Console.js";
import { PrintStream } from "./Utils/logging/PrintStream.js";
import { Scoreboard } from "./Utils/data/scoreboard.js";
import { PlayerBlockSelection } from "./Utils/data/PlayerBlockSelection.js";
import { BlockStatDB } from "./Utils/stats/BlockStatDB.js";
import { BlockStatEntry, BSEntryJSONData } from "./Utils/stats/BlockStatEntry.js";
import { blockstatsCmd } from "./Command/Commands/blockstatsCommand.js";
import { sneakstatsCmd } from "./Command/Commands/sneakstatsCommand.js";
import { Vec3 } from "./Utils/data/vec3.js";
import { distmovedstatsCmd } from "./Command/Commands/distTravelledCommand.js";
import { DataCheckHelper } from "./Utils/data/DataCheckHelper.js";

export let printStream: PrintStream = new PrintStream(world.getDimension("overworld"));
export let playerBlockSelection: PlayerBlockSelection[] = [];
export let playerBlockStatDB: Map<Player, BlockStatDB> = new Map<Player, BlockStatDB>();
export let playerBlocksIntDB: Map<Player, BlockStatDB> = new Map<Player, BlockStatDB>();
export let playerCrouchTimeDB: Map<Player, number> = new Map<Player, number>();
export let playerDistTravelledDB: Map<Player, number> = new Map<Player, number>();
export let playerPrevLocDB: Map<Player, Location> = new Map<Player, Location>();
let operators = [
    { "name": "Rscraft388", "permissionLevel": 99 },
    { "name": "Dunnowtsi07", "permissionLevel": 0 }
];
let commands: Command[] = [
    sudoCmd,
    blockstatsCmd,
    sneakstatsCmd,
    distmovedstatsCmd
];
const cmdPrefix = ",";
world.events.playerJoin.subscribe((eventData: PlayerJoinEvent) => {
    //PlayerTag.clearTags(eventData.player);
    //crouchStat
    if (!PlayerTag.hasTag(eventData.player, "dpm:sneakTime")) {
        playerCrouchTimeDB.set(eventData.player, 0);
    } else {
        playerCrouchTimeDB.set(eventData.player, parseInt(PlayerTag.read(eventData.player, "dpm:sneakTime").data));
    }
    playerPrevLocDB.set(eventData.player, eventData.player.location);
    //distTravelledStat
    if (!PlayerTag.hasTag(eventData.player, "dpm:distTravelled")) {
        playerDistTravelledDB.set(eventData.player, 0);
    } else {
        playerDistTravelledDB.set(eventData.player, parseInt(PlayerTag.read(eventData.player, "dpm:distTravelled").data));
    }
    //sudo
    if (!PlayerTag.hasTag(eventData.player, "dpm:sudo")) {
        let sudoData: PlayerData = new PlayerData({ "sudoToggled": false, "sudoName": "pico", "target": "@a" }, "object", "dpm:sudo");
        let sudoTag: PlayerTag = new PlayerTag(sudoData);
        sudoTag.write(eventData.player);
    }
    //blockStat
    /*if (!playerBlockStatDB.has(eventData.player)) {
        playerBlockStatDB.set(eventData.player, new BlockStatDB);
    } else {
        playerBlockStatDB.set(eventData.player, new BlockStatDB((PlayerTag.read(eventData.player, "dpm:block_stats").data as BlockStatEntry[])));
    }*/
})
world.events.beforeItemUseOn.subscribe((eventData: BeforeItemUseOnEvent) => {
    //world.getDimension("overworld").runCommand(`say ${}`)
    /*let t:BlockType = eventData.source.dimension.getBlock(eventData.blockLocation).type;
    eventData.source.dimension.getBlock(eventData.blockLocation).permutation
    printStream.println(((eventData.source.dimension.getBlock(eventData.blockLocation).getComponent("inventory") as BlockInventoryComponent).container.emptySlotsCount));
    eventData.source.dimension.getBlock(eventData.blockLocation).setType(t)
    eventData.item.getComponents().forEach((c) => {
        printStream.println(c.id);
    })*/
    printStream.println(DataCheckHelper.isContainerEmpty(eventData.source.dimension.getBlock(eventData.blockLocation)));
    eventData.source.dimension.getBlock(eventData.blockLocation).permutation.getAllProperties().forEach((p) => {
        printStream.println(p.name);
    });
})
world.events.tick.subscribe((eventData: TickEvent) => {
    let pList: Player[] = world.getPlayers();
    for (let p of pList) {
        //distTravelledStat
        //printStream.println(`${playerDistTravelledDB.get(p)}`);
        if (!playerPrevLocDB.get(p).equals(p.location)) {
            let l: Location = playerPrevLocDB.get(p);
            playerDistTravelledDB.set(p, playerDistTravelledDB.get(p) + new Vec3(l.x, l.y, l.z).distanceTo(new Vec3(p.location.x, p.location.y, p.location.z)));
            playerPrevLocDB.set(p, p.location);
        }
        let distTravelledData: PlayerData = new PlayerData(playerDistTravelledDB.get(p), "number", "dpm:distTravelled");
        let distTravelledTag: PlayerTag = new PlayerTag(distTravelledData);
        distTravelledTag.write(p);
        //crouchStat
        if (p.isSneaking == true) {
            playerCrouchTimeDB.set(p, playerCrouchTimeDB.get(p) + 1);
        }
        let blockData: PlayerData = new PlayerData(playerCrouchTimeDB.get(p), "number", "dpm:sneakTime");
        let blockTag: PlayerTag = new PlayerTag(blockData);
        blockTag.write(p);

        BlockStatDB.getBlockAtPointer(p);
    }
})
world.events.blockBreak.subscribe((eventData: BlockBreakEvent) => {
    /*let id:string = BlockStatDB.getBlockBroken(eventData.player);
    playerBlockStatDB.get(eventData.player).addBroken(id);
    let blockData: PlayerData = new PlayerData(playerBlockStatDB.get(eventData.player).db, "object", "dpm:block_stats");
    let blockTag:PlayerTag = new PlayerTag(blockData);
    blockTag.write(eventData.player);*/
})
world.events.beforeChat.subscribe((eventData: BeforeChatEvent) => {
    eventData.cancel = true;
    if (eventData.message[0] === cmdPrefix) {
        let opIdx = operators.map(a => a.name).indexOf(eventData.sender.name);
        eventData.message = eventData.message.substring(1);
        cmdHandler(eventData, operators[opIdx].permissionLevel);
    } else {
        let rSudoData = PlayerTag.read(eventData.sender, "sudo");
        if (rSudoData.data.sudoToggled == true) {
            printStream.sudoChat(eventData.message, rSudoData.data.sudoName, rSudoData.data.target);
        } else {
            printStream.chat(eventData.message, eventData.sender);
        }
    }

    //printStream.debugEnabled = false;
    //printStream.debug("Chat Msg Sent");
    //if (world.getPlayers().length != 0) {
    //printStream.debug("Check for players");
    //printStream.println(eventData.sender.name + " is online");
    //printStream.println(eventData.sender);
    //printStream.debug("Printed Results of Check");
    //printStream.println("Is Piglin an objective: " + Scoreboard.hasObjective(eventData.sender,"piglin"));
    //    let p: PlayerData = new PlayerData({ "Xcoord": 456, "Ycoord": 587, "Zcoord": 34 }, "object", "coords");
    //    let tag: PlayerTag = new PlayerTag(p);
    //    printStream.println(PlayerTag.read(eventData.sender, "sudo").data.sudoName);
    //} else {
    //    printStream.println("0 players online");
    //}
});
function cmdHandler(chatEvent: ChatEvent, opLevel: number) {
    const cmdBase = chatEvent.message.split(" ")[0];
    const cmdArgs = chatEvent.message.split(" ").slice(1).join(" ");
    const player = chatEvent.sender;
    let cmdIdx = commands.map(a => a.name).indexOf(cmdBase);
    let subCmdIdx = commands[cmdIdx].cmdParameters.map(a => a.testRegex(cmdArgs)).indexOf(true);
    printStream.println(subCmdIdx);
    if (subCmdIdx != -1) {
        let args = commands[cmdIdx].cmdParameters[subCmdIdx].parseRegex(cmdArgs);
        let parsedArgs: Map<string, any> = new Map()
        commands[cmdIdx].cmdParameters[subCmdIdx].para.map((para, i) => { parsedArgs.set(para.name, para.type.parse(args[i])) })
        const retArgs: any = commands[cmdIdx].execute(player, parsedArgs, subCmdIdx);
        const retMsg = retArgs[0]
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
