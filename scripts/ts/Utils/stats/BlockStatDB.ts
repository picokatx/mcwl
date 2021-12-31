import { Block, BlockType, MinecraftBlockTypes, Player } from "mojang-minecraft";
import { playerBlockSelection } from "../../Main.js";
import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerBlockSelection } from "../data/PlayerBlockSelection.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
import { BaseTagDB } from "./BaseTagDB.js";
import { BlockStatEntry } from "./BlockStatEntry.js";

export class BlockStatDB implements BaseTagDB {
    db: BlockStatEntry[] = [];
    constructor(db: BlockStatEntry[] | number, dbCount?: number) {
        if (typeof db == 'number') {
            let blockTypelen = MinecraftBlockTypes.getAllBlockTypes().length;
            let chunkExt = blockTypelen % dbCount;
            let chunkSize = Math.floor((blockTypelen - blockTypelen % dbCount) / dbCount);
            let blockTypes: BlockType[] = MinecraftBlockTypes.getAllBlockTypes();
            if (db == dbCount - 1) {
                for (let i = db * chunkSize; i < chunkSize * (db + 1) + chunkExt; i++) {
                    this.db.push(new BlockStatEntry(blockTypes[i].id));
                }
            } else {
                for (let i = db * chunkSize; i < chunkSize * (db + 1); i++) {
                    this.db.push(new BlockStatEntry(blockTypes[i].id));
                }
            }
        } else {
            this.db = db;
        }
    }
    add(id: string, dataType: ('blocksPlaced' | 'blocksBroken')) {
        if (this.getEntryById(id) == null) {
            return
        }
        if (dataType == 'blocksBroken') {
            this.getEntryById(id).blocksBroken += 1;
        } else {
            this.getEntryById(id).blocksPlaced += 1;
        }
    }
    set(id: string, val: number, dataType: ('blocksPlaced' | 'blocksBroken')) {
        if (this.getEntryById(id) == null) {
            return
        }
        if (dataType == 'blocksBroken') {
            this.getEntryById(id).blocksBroken = val;
        } else {
            this.getEntryById(id).blocksPlaced = val;
        }
    }
    getEntryById(id: string): BlockStatEntry {
        for (let i of this.db) {
            if (i.id == id) {
                return i;
            }
        }
    }
    static getBlockAtPointer(p: Player) {
        if (playerBlockSelection.length >= 3) {
            playerBlockSelection.shift();
        }
        let b: Block = p.getBlockFromViewVector();
        if (b != null) {
            playerBlockSelection.push(new PlayerBlockSelection(p, p.getBlockFromViewVector()));
        }
    }
    static getBlockBroken(p: Player): string {
        for (let i of playerBlockSelection) {
            if (i.player.name == p.name && i.blockID != "minecraft:air" && i.blockID != "minecraft:water") {
                return i.blockID;
            }
        }
    }
    initialize(playerMap: Map<Player, BlockStatDB>, player: Player, defaultValue: BlockStatDB, dbNum?: number) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.blocksModified + "_" + dbNum)) {
            playerMap.set(player, defaultValue);
            let data: PlayerData
            if (dbNum == null) {
                data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified);
            } else {
                data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified + "_" + dbNum);
            }
            let tag: PlayerTag = new PlayerTag(data);
            tag.write(player);
        } else {
            this.db = PlayerTag.read(player, MCWLNamespaces.blocksModified + "_" + dbNum).data
            playerMap.set(player, this);
        }
    }
    saveToTag(player: Player, dbNum?: number) {
        let data: PlayerData
        if (dbNum == null) {
            data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified);
        } else {
            data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified + "_" + dbNum);
        }
        let tag: PlayerTag = new PlayerTag(data);
        tag.write(player);
    }
}