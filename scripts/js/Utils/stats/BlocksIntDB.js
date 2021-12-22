import { Items, MinecraftBlockTypes } from "mojang-minecraft";
import { playerBlockSelection } from "../../Main.js";
import { PlayerBlockSelection } from "../data/PlayerBlockSelection.js";
import { BlockStatEntry } from "./BlockStatEntry.js";
export const ITEM_ANY = Items.get("minecraft:air");
export class BlocksIntDB {
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
    addBroken(id) {
        this.getEntryById(id).blocksBroken += 1;
    }
    addPlaced(id) {
        this.getEntryById(id).blocksBroken += 1;
    }
    setBroken(id, val) {
        this.getEntryById(id).blocksBroken = val;
    }
    setPlaced(id, val) {
        this.getEntryById(id).blocksBroken = val;
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
}
