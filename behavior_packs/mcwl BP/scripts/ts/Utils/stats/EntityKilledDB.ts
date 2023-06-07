import { EntityKilledEntry } from "./EntityKilledEntry.js";
import { Player } from "mojang-minecraft";
import { DamageEntityTypes, MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
import { BaseTagDB } from "./BaseTagDB.js";
import { printStream } from "../../Main.js";
export class EntityKilledDB implements BaseTagDB {
    db: EntityKilledEntry[] = [];
    constructor(db?: EntityKilledEntry[]) {
        if (db == null) {
            for (let i of Object.values(DamageEntityTypes)) {
                this.db.push(new EntityKilledEntry(i,0))
            }
        } else {
            this.db = db;
        }
    }
    add(namespace: string) {
        this.getEntryById(namespace).count += 1;
    }
    set(namespace: string, val: number) {
        this.getEntryById(namespace).count = val;
    }
    getEntryById(namespace: string): EntityKilledEntry {
        for (let i of this.db) {
            if (i.namespace == namespace) {
                return i;
            }
        }
    }
    initialize(playerMap: Map<Player, EntityKilledDB>, player: Player, defaultValue: EntityKilledDB) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.entityKilled)) {
            playerMap.set(player, defaultValue);
        } else {
            this.db = PlayerTag.read(player, MCWLNamespaces.entityKilled).data;
            playerMap.set(player, this);
        }
    }
    saveToTag(player: Player) {
        let data: PlayerData = new PlayerData(this.db, "object", MCWLNamespaces.entityKilled);
        let tag: PlayerTag = new PlayerTag(data);
        tag.write(player);
    }
    toJSONString():string {
        return JSON.stringify(new PlayerData(this.db, "object", MCWLNamespaces.entityKilled));
    }
}