import { BaseTagEntry } from "./BaseTagEntry.js";
export class EntityKilledEntry implements BaseTagEntry {
    namespace: string
    count: number
    constructor(stat: string, count?: number) {
        this.namespace = stat;
        if (count != null) {
            this.count = count;
        } else {
            this.count = 0;
        }
    }
    toJSON(): EKEntryJSONData {
        return Object.assign({}, this);
    }
    static fromJSON(json: EKEntryJSONData | string): EntityKilledEntry {
        if (typeof json === 'string') {
            return JSON.parse(json, EntityKilledEntry.reviver);
        } else {
            let user = Object.create(EntityKilledEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? EntityKilledEntry.fromJSON(value) : value;
    }
}
export interface EKEntryJSONData {
    namespace: string
    count: number
}