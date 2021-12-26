import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
export class SudoEntry {
    constructor(sudoToggled, sudoName, target) {
        if (sudoToggled == null && sudoName == null && target == null) {
            this.sudoToggled = false;
            this.sudoName = "pico";
            this.target = "@a";
        }
        else {
            this.sudoToggled = sudoToggled;
            this.sudoName = sudoName;
            this.target = target;
        }
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, SudoEntry.reviver);
        }
        else {
            let user = Object.create(SudoEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? SudoEntry.fromJSON(value) : value;
    }
    initialize(playerMap, player) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.sudo)) {
            playerMap.set(player, this);
            let data = new PlayerData(this, "object", MCWLNamespaces.sudo);
            let tag = new PlayerTag(data);
            tag.write(player);
        }
        else {
            let tag = PlayerTag.read(player, MCWLNamespaces.sudo).data;
            this.sudoToggled = tag.sudoToggled;
            this.sudoName = tag.sudoName;
            this.target = tag.target;
        }
    }
    saveToTag(player) {
        let data = new PlayerData(this, "object", MCWLNamespaces.sudo);
        let tag = new PlayerTag(data);
        tag.write(player);
    }
}
