import { EntityKilledEntry } from "./EntityKilledEntry.js";
import { DamageEntityTypes, MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
export class EntityKilledDB {
    constructor(db) {
        this.db = [];
        if (db == null) {
            for (let i of Object.values(DamageEntityTypes)) {
                this.db.push(new EntityKilledEntry(i, 0));
            }
        }
        else {
            this.db = db;
        }
    }
    add(namespace) {
        this.getEntryById(namespace).count += 1;
    }
    set(namespace, val) {
        this.getEntryById(namespace).count = val;
    }
    getEntryById(namespace) {
        for (let i of this.db) {
            if (i.namespace == namespace) {
                return i;
            }
        }
    }
    initialize(playerMap, player, defaultValue) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.entityKilled)) {
            playerMap.set(player, defaultValue);
        }
        else {
            this.db = PlayerTag.read(player, MCWLNamespaces.entityKilled).data;
            playerMap.set(player, this);
        }
    }
    saveToTag(player) {
        let data = new PlayerData(this.db, "object", MCWLNamespaces.entityKilled);
        let tag = new PlayerTag(data);
        tag.write(player);
    }
    toJSONString() {
        return JSON.stringify(new PlayerData(this.db, "object", MCWLNamespaces.entityKilled));
    }
}
