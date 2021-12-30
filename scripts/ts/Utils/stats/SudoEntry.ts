import { Player } from "mojang-minecraft";
import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
import { BaseTagEntry } from "./BaseTagEntry.js";

export class SudoEntry implements BaseTagEntry {
    sudoToggled: boolean
    sudoName: string
    target: string
    constructor(sudoToggled?: boolean,sudoName?: string,target?: string) {
        if (sudoToggled==null && sudoName==null && target==null) {
            this.sudoToggled = false;
            this.sudoName = "pico";
            this.target = "@a";
        } else {
            this.sudoToggled = sudoToggled;
            this.sudoName = sudoName;
            this.target = target;
        }
    }
    toJSON(): SudoEntryJSONData {
        return Object.assign({}, this);
    }
    
    static fromJSON(json: SudoEntryJSONData | string): SudoEntry {
        if (typeof json === 'string') {
            return JSON.parse(json, SudoEntry.reviver);
        } else {
            let user = Object.create(SudoEntry.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? SudoEntry.fromJSON(value) : value;
    }
    initialize(playerMap: Map<Player, SudoEntry>, player: Player,) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.sudo)) {
            playerMap.set(player,this);
            let data: PlayerData = new PlayerData(this, "object", MCWLNamespaces.sudo);
            let tag: PlayerTag = new PlayerTag(data);
            tag.write(player);
        } else {
            let tag = PlayerTag.read(player, MCWLNamespaces.sudo).data;
            this.sudoToggled = tag.sudoToggled;
            this.sudoName = tag.sudoName;
            this.target = tag.target;
            playerMap.set(player, this);
        }
    }
    saveToTag(player: Player) {
        let data: PlayerData = new PlayerData(this, "object", MCWLNamespaces.sudo);
        let tag: PlayerTag = new PlayerTag(data);
        tag.write(player);
    }
}
export interface SudoEntryJSONData {
    sudoToggled: boolean
    sudoName: string
    target: string
}