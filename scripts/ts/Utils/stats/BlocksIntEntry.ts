import { Block, Items, MinecraftBlockTypes, Player, world } from "mojang-minecraft";
import { playerBlockSelection, printStream } from "../../Main.js";
import { PlayerBlockSelection } from "../data/PlayerBlockSelection.js";
import { BlockStatEntry } from "./BlockStatEntry.js";
export const ITEM_ANY = "minecraft:any";
export class BlocksIntEntry {
    stat: string
    count: number
    constructor(stat:string, count?:number) {
        this.stat = stat;
        if (count!=null) {
            this.count = count;
        } else {
            this.count = 0;
        }
    }
    toJSON(): BIEntryJSONData {
        return Object.assign({}, this);
    }
    static fromJSON(json: BIEntryJSONData | string): BlockStatEntry {
        if (typeof json === 'string') {
            return JSON.parse(json, BlockStatEntry.reviver);
        } else {
            let user = Object.create(BlockStatEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? BlockStatEntry.fromJSON(value) : value;
    }
}
export interface BIEntryJSONData {
    stat: string
    count: number
}