import { MolangNamespaces } from "../constants/MolangNamespaces.js";
import { MolangQueryEntry } from "./MolangQueryEntry.js";
export class MolangQueryDB {
    constructor(db) {
        if (db == null) {
            for (let i of Object.values(MolangNamespaces)) {
                db.push(new MolangQueryEntry(i));
            }
        }
        else {
            this.db = db;
        }
    }
    getState(s) {
        for (let i of this.db) {
            if (i.id == s) {
                return i.value;
            }
        }
    }
    setState(s, value) {
        for (let i of this.db) {
            if (i.id == s) {
                i.value = value;
            }
        }
    }
}
