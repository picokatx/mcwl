export class MolangQueryEntry {
    constructor(id) {
        this.id = id;
        this.value = undefined;
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, MolangQueryEntry.reviver);
        }
        else {
            let user = Object.create(MolangQueryEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? MolangQueryEntry.fromJSON(value) : value;
    }
}
