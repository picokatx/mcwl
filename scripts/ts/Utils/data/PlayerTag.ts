import { Player } from "mojang-minecraft";
import { PlayerData } from "./PlayerData.js";
const namespace: string = "dpm";
export class PlayerTag {
    pData: PlayerData
    constructor(data: PlayerData) {
        this.pData = data
    }
    writeNew(player: Player) {
        player.addTag(JSON.stringify(this.pData));
    }
    write(player: Player) {
        for (let i of player.getTags()) {
            let j: PlayerData = PlayerData.fromJSON(JSON.parse(i));
            if (j.name == this.pData.name) {
                player.removeTag(i)
                player.addTag(JSON.stringify(this.pData));
                return
            };
        }
        player.addTag(JSON.stringify(this.pData));
    }
    static clearTags(player: Player) {
        for (let i of player.getTags()) {
            player.removeTag(i);
        }
    }
    static hasTag(player: Player, tagName: string): boolean {
        for (let i of player.getTags()) {
            if (PlayerData.fromJSON(JSON.parse(i)).name == tagName) {
                return true;
            };
        }
        return false;
    }
    static read(player: Player, tagName: string): PlayerData {
        for (let i of player.getTags()) {
            let j: PlayerData = PlayerData.fromJSON(JSON.parse(i));
            if (j.name == tagName) {
                return j;
            };
        }
        return null;
    }
}