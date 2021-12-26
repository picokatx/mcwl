import { BaseTagEntry } from "./BaseTagEntry";

export class BlockStatEntry implements BaseTagEntry {
    id: string
    blocksBroken: number
    blocksPlaced: number
    constructor(id: string) {
        this.id = id;
        this.blocksBroken = 0;
        this.blocksPlaced = 0;
    }
    toJSON(): BSEntryJSONData {
        return Object.assign({}, this);
    }
    static fromJSON(json: BSEntryJSONData | string): BlockStatEntry {
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
export interface BSEntryJSONData {
    id: string
    blocksBroken: number
    blocksPlaced: number
}