import { Block, BlockType, MinecraftBlockTypes, Player, world } from "mojang-minecraft";
import { playerBlockSelection, printStream } from "../../Main.js";
import { PlayerBlockSelection } from "../data/PlayerBlockSelection.js";
import { BlockStatEntry } from "./BlockStatEntry.js";

export class BlockStatDB {
    db: BlockStatEntry[] = [];
    constructor(db?: BlockStatEntry[]) {
        if (db==null) {
            MinecraftBlockTypes.getAllBlockTypes().forEach((s)=> {
                this.db.push(new BlockStatEntry(s.id));
            })
        } else {
            this.db = db;
        }
    }
    addBroken(id: string) {
        this.getEntryById(id).blocksBroken += 1;
    }
    addPlaced(id: string) {
        this.getEntryById(id).blocksBroken += 1;
    }
    setBroken(id: string,val: number) {
        this.getEntryById(id).blocksBroken = val;
    }
    setPlaced(id: string,val: number) {
        this.getEntryById(id).blocksBroken = val;
    }
    getEntryById(id: string): BlockStatEntry {
        for (let i of this.db) {
            if (i.id==id) {
                return i;
            }
        }
    }

    static getBlockAtPointer(p:Player) {
        if (playerBlockSelection.length >= 3) {
            playerBlockSelection.shift();
        }
        let b:Block = p.getBlockFromViewVector();
        if (b!=null) {
            playerBlockSelection.push(new PlayerBlockSelection(p, p.getBlockFromViewVector()));
        }
    }
    static getBlockBroken(p:Player):string {
        for (let i of playerBlockSelection) {
            if (i.player.name == p.name && i.blockID != "minecraft:air" && i.blockID != "minecraft:water") {
                return i.blockID;
            }
        }
    }
}