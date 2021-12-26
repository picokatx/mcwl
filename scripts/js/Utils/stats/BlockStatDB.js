import { MinecraftBlockTypes } from "mojang-minecraft";
import { playerBlockSelection } from "../../Main.js";
import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerBlockSelection } from "../data/PlayerBlockSelection.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
import { BlockStatEntry } from "./BlockStatEntry.js";
export class BlockStatDB {
    constructor(db) {
        this.db = [];
        if (db == null) {
            MinecraftBlockTypes.getAllBlockTypes().forEach((s) => {
                this.db.push(new BlockStatEntry(s.id));
            });
        }
        else {
            this.db = db;
        }
    }
    add(id, dataType) {
        if (dataType == 'blocksBroken') {
            this.getEntryById(id).blocksBroken += 1;
        }
        else {
            this.getEntryById(id).blocksPlaced += 1;
        }
    }
    set(id, val, dataType) {
        if (dataType == 'blocksBroken') {
            this.getEntryById(id).blocksBroken = val;
        }
        else {
            this.getEntryById(id).blocksPlaced = val;
        }
    }
    getEntryById(id) {
        for (let i of this.db) {
            if (i.id == id) {
                return i;
            }
        }
    }
    static getBlockAtPointer(p) {
        if (playerBlockSelection.length >= 3) {
            playerBlockSelection.shift();
        }
        let b = p.getBlockFromViewVector();
        if (b != null) {
            playerBlockSelection.push(new PlayerBlockSelection(p, p.getBlockFromViewVector()));
        }
    }
    static getBlockBroken(p) {
        for (let i of playerBlockSelection) {
            if (i.player.name == p.name && i.blockID != "minecraft:air" && i.blockID != "minecraft:water") {
                return i.blockID;
            }
        }
    }
    initialize(playerMap, player, defaultValue) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.blocksModified)) {
            playerMap.set(player, defaultValue);
            let data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified);
            let tag = new PlayerTag(data);
            tag.write(player);
        }
        else {
            this.db = PlayerTag.read(player, MCWLNamespaces.blocksModified).data;
        }
    }
    saveToTag(player) {
        let data = new PlayerData(this.db, "object", MCWLNamespaces.blocksModified);
        let tag = new PlayerTag(data);
        tag.write(player);
    }
}
