export class BlockStatEntry {
    constructor(id) {
        this.id = id;
        this.blocksBroken = 0;
        this.blocksPlaced = 0;
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, BlockStatEntry.reviver);
        }
        else {
            let user = Object.create(BlockStatEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? BlockStatEntry.fromJSON(value) : value;
    }
}
