import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { molangQueries } from "../constants/MolangNamespaces.js";
import { BlocksIntDB } from "../stats/BlocksIntDB.js";
import { BlockStatDB } from "../stats/BlockStatDB.js";
import { SudoEntry } from "../stats/SudoEntry.js";
import { DataHelper } from "./DataHelper.js";
import { PlayerData } from "./PlayerData.js";
import { PlayerTag } from "./PlayerTag.js";
export class MolangNamespace {
}
export class PlayerDB {
    constructor(player, createNew) {
        this.playerName = player.name;
        this.player = player;
        this.molangQueries = molangQueries;
        this.blockMod = [];
        if (createNew == true) {
            this.blockMod.push(new BlockStatDB(0, 5));
            this.blockMod.push(new BlockStatDB(1, 5));
            this.blockMod.push(new BlockStatDB(2, 5));
            this.blockMod.push(new BlockStatDB(3, 5));
            this.blockMod.push(new BlockStatDB(4, 5));
            this.blockInt = new BlocksIntDB();
            this.crouchTime = 0;
            this.joined = 0;
            this.distanceTravelled = 0;
            this.deaths = 0;
            this.raidsTriggered = 0;
            this.jump = 0;
            this.timeSinceDeath = 0;
            this.playtime = 0;
            this.sudo = new SudoEntry(false, "pico", "@a");
            this.firstJoined = new Date().toString();
            this.versionID = 1;
            this.write();
        }
        else {
            this.read();
        }
    }
    write() {
        let p = DataHelper.getPlayer(this.playerName);
        if (p == null) {
            p = this.player;
        }
        PlayerTag.clearTags(p);
        for (let i of this.toString()) {
            p.addTag(i);
        }
    }
    read() {
        let p = DataHelper.getPlayer(this.playerName);
        if (p == null) {
            p = this.player;
        }
        let lore = p.getTags();
        lore.forEach((dbString) => {
            let parsedDB = PlayerData.fromJSON(JSON.parse(dbString));
            let data = parsedDB.data;
            let switchStr = parsedDB.name;
            switch (switchStr) {
                case MCWLNamespaces["blockInteractions"]:
                    this.blockInt = new BlocksIntDB(data);
                    break;
                case MCWLNamespaces["blocksModified"]:
                    this.blockMod.push(new BlockStatDB(data));
                    break;
                case MCWLNamespaces["distanceTravelled"]:
                    this.distanceTravelled = parseInt(data);
                    break;
                case MCWLNamespaces["jump"]:
                    this.jump = parseInt(data);
                    break;
                case MCWLNamespaces["playerFirstJoined"]:
                    this.firstJoined = data;
                    break;
                case MCWLNamespaces["raidTrigger"]:
                    this.firstJoined = data;
                    break;
                case MCWLNamespaces["playerJoined"]:
                    this.joined = parseInt(data);
                    break;
                case MCWLNamespaces["playtime"]:
                    this.playtime = parseInt(data);
                    break;
                case MCWLNamespaces["sneakDuration"]:
                    this.crouchTime = parseInt(data);
                    break;
                case MCWLNamespaces["sudo"]:
                    this.sudo = Object.assign(new SudoEntry(), data);
                    break;
                case MCWLNamespaces["deaths"]:
                    this.deaths = parseInt(data);
                    break;
                case MCWLNamespaces["timeSinceDeath"]:
                    this.timeSinceDeath = parseInt(data);
                    break;
                case MCWLNamespaces["playerName"]:
                    this.playerName = data;
                    this.player = DataHelper.getPlayer(this.playerName);
                    break;
                case MCWLNamespaces["versionID"]:
                    this.versionID = parseInt(data);
                    break;
            }
        });
    }
    toString() {
        let ret = [];
        this.blockMod.forEach((db) => {
            ret.push(db.toJSONString());
        });
        ret.push(this.attrToString(this.playerName, MCWLNamespaces.playerName));
        ret.push(this.attrToString(this.versionID, MCWLNamespaces.versionID));
        ret.push(this.blockInt.toJSONString());
        ret.push(this.sudo.toJSONString());
        ret.push(this.attrToString(this.raidsTriggered, MCWLNamespaces.raidTrigger));
        ret.push(this.attrToString(this.jump, MCWLNamespaces.jump));
        ret.push(this.attrToString(this.deaths, MCWLNamespaces.deaths));
        ret.push(this.attrToString(this.timeSinceDeath, MCWLNamespaces.timeSinceDeath));
        ret.push(this.attrToString(this.crouchTime, MCWLNamespaces.sneakDuration));
        ret.push(this.attrToString(this.joined, MCWLNamespaces.playerJoined));
        ret.push(this.attrToString(this.distanceTravelled, MCWLNamespaces.distanceTravelled));
        ret.push(this.attrToString(this.playtime, MCWLNamespaces.playtime));
        ret.push(this.attrToString(this.firstJoined, MCWLNamespaces.playerFirstJoined));
        return ret;
    }
    attrToString(attr, tagName) {
        let data = new PlayerData(attr, typeof attr, tagName);
        return JSON.stringify(data);
    }
}
