import { PlayerData } from "./PlayerData.js";
const namespace = "dpm";
export class PlayerTag {
    constructor(data) {
        this.pData = data;
    }
    writeNew(player) {
        player.addTag(JSON.stringify(this.pData));
    }
    write(player) {
        for (let i of player.getTags()) {
            let j = PlayerData.fromJSON(JSON.parse(i));
            if (j.name == this.pData.name) {
                player.removeTag(i);
                player.addTag(JSON.stringify(this.pData));
                return;
            }
            ;
        }
        player.addTag(JSON.stringify(this.pData));
    }
    static clearTags(player) {
        for (let i of player.getTags()) {
            player.removeTag(i);
        }
    }
    static hasTag(player, tagName) {
        for (let i of player.getTags()) {
            if (PlayerData.fromJSON(JSON.parse(i)).name == tagName) {
                return true;
            }
            ;
        }
        return false;
    }
    static read(player, tagName) {
        for (let i of player.getTags()) {
            let j = PlayerData.fromJSON(JSON.parse(i));
            if (j.name == tagName) {
                return j;
            }
            ;
        }
        return null;
    }
}
