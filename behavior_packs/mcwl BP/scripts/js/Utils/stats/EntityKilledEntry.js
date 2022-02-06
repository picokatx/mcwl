export class EntityKilledEntry {
    constructor(stat, count) {
        this.namespace = stat;
        if (count != null) {
            this.count = count;
        }
        else {
            this.count = 0;
        }
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, EntityKilledEntry.reviver);
        }
        else {
            let user = Object.create(EntityKilledEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? EntityKilledEntry.fromJSON(value) : value;
    }
}
