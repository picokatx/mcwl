import { Player } from "mojang-minecraft";
import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { molangQueries } from "../constants/MolangNamespaces.js";
import { BlocksIntDB } from "../stats/BlocksIntDB.js";
import { BlockStatDB } from "../stats/BlockStatDB.js";
import { EntityKilledDB } from "../stats/EntityKilledDB.js";
import { SudoEntry } from "../stats/SudoEntry.js";
import { DataHelper } from "./DataHelper.js";
import { PlayerData } from "./PlayerData.js";
import { PlayerTag } from "./PlayerTag.js";
export class MolangNamespace {
    id: string
    value: boolean
}
export class PlayerDB {
    blockMod: BlockStatDB[]
    blockInt: BlocksIntDB
    entitiesKilled: EntityKilledDB
    deaths: number
    timeSinceDeath: number
    crouchTime: number
    joined: number
    jump: number
    distanceTravelled: number
    playtime: number
    raidsTriggered: number
    sudo: SudoEntry
    firstJoined: string
    molangQueries: Map<string,boolean>
    player: Player
    playerName: string
    versionID: number
    timeSinceRest: number
    sleepInBed: number
    health: boolean[]
    healthVal: number
    constructor(player: Player, createNew: boolean) {
        this.playerName = player.name
        this.player = player
        this.molangQueries = molangQueries
        this.blockMod = []
        if (createNew==true) {
            this.blockMod.push(new BlockStatDB(0, 5));
            this.blockMod.push(new BlockStatDB(1, 5));
            this.blockMod.push(new BlockStatDB(2, 5));
            this.blockMod.push(new BlockStatDB(3, 5));
            this.blockMod.push(new BlockStatDB(4, 5));
            this.blockInt = new BlocksIntDB();
            this.entitiesKilled = new EntityKilledDB();
            this.crouchTime = 0
            this.joined = 0
            this.distanceTravelled = 0
            this.deaths = 0
            this.sleepInBed = 0
            this.timeSinceRest = 0
            this.raidsTriggered = 0
            this.jump = 0
            this.timeSinceDeath = 0
            this.playtime = 0
            this.sudo = new SudoEntry(false,"pico","@a")
            this.firstJoined = new Date().toString()
            this.versionID = 1
            this.health = [false,false,false,false,false]
            this.healthVal = 0
            this.write()
        } else {
            this.read()
        }
    }
    write() {
        let p:Player = DataHelper.getPlayer(this.playerName)
        if (p==null) {
            p = this.player
        }
        PlayerTag.clearTags(p);
        for (let i of this.toString()) {
            p.addTag(i);
        }
    }
    read() {
        let p = DataHelper.getPlayer(this.playerName);
        if (p==null) {
            p = this.player
        }
        let lore = p.getTags()
        lore.forEach((dbString)=> {
            let parsedDB:PlayerData = PlayerData.fromJSON(JSON.parse(dbString))
            let data: any = parsedDB.data;
            let switchStr = parsedDB.name
            switch (switchStr) {
                case MCWLNamespaces["entityKilled"]:
                    this.entitiesKilled = new EntityKilledDB(data)
                case MCWLNamespaces["health"]:
                    this.health = data
                    break
                case MCWLNamespaces["blockInteractions"]:
                    this.blockInt = new BlocksIntDB(data)
                    break
                case MCWLNamespaces["blocksModified"]:
                    this.blockMod.push(new BlockStatDB(data))
                    break
                case MCWLNamespaces["distanceTravelled"]:
                    this.distanceTravelled = parseInt(data)
                    break
                case MCWLNamespaces["jump"]:
                    this.jump = parseInt(data)
                    break
                case MCWLNamespaces["playerFirstJoined"]:
                    this.firstJoined = data
                    break
                case MCWLNamespaces["raidTrigger"]:
                    this.raidsTriggered = parseInt(data)
                    break
                case MCWLNamespaces["timeSinceRest"]:
                    this.timeSinceRest = parseInt(data)
                    break
                case MCWLNamespaces["sleepInBed"]:
                    this.sleepInBed = parseInt(data)
                    break
                case MCWLNamespaces["playerJoined"]:
                    this.joined = parseInt(data)
                    break
                case MCWLNamespaces["playtime"]:
                    this.playtime = parseInt(data)
                    break
                case MCWLNamespaces["sneakDuration"]:
                    this.crouchTime = parseInt(data)
                    break
                case MCWLNamespaces["sudo"]:
                    this.sudo = Object.assign(new SudoEntry(), data)
                    break
                case MCWLNamespaces["deaths"]:
                    this.deaths = parseInt(data)
                    break
                case MCWLNamespaces["timeSinceDeath"]:
                    this.timeSinceDeath = parseInt(data)
                    break
                case MCWLNamespaces["playerName"]:
                    this.playerName = data
                    this.player = DataHelper.getPlayer(this.playerName)
                    break
                case MCWLNamespaces["versionID"]:
                    this.versionID = parseInt(data)
                    break
            }
        })
    }

    toString():string[] {
        let ret:string[] = []        
        this.blockMod.forEach((db)=> {
            ret.push(db.toJSONString());
        })
        ret.push(this.attrToString(this.playerName,MCWLNamespaces.playerName))
        ret.push(this.attrToString(this.versionID,MCWLNamespaces.versionID))
        ret.push(this.attrToString(this.health,MCWLNamespaces.health))
        ret.push(this.blockInt.toJSONString());
        ret.push(this.sudo.toJSONString());
        ret.push(this.entitiesKilled.toJSONString());
        ret.push(this.attrToString(this.raidsTriggered, MCWLNamespaces.raidTrigger));
        ret.push(this.attrToString(this.sleepInBed, MCWLNamespaces.sleepInBed));
        ret.push(this.attrToString(this.timeSinceRest, MCWLNamespaces.timeSinceRest));
        ret.push(this.attrToString(this.jump, MCWLNamespaces.jump));
        ret.push(this.attrToString(this.deaths, MCWLNamespaces.deaths));
        ret.push(this.attrToString(this.timeSinceDeath, MCWLNamespaces.timeSinceDeath));
        ret.push(this.attrToString(this.crouchTime, MCWLNamespaces.sneakDuration));
        ret.push(this.attrToString(this.joined, MCWLNamespaces.playerJoined));
        ret.push(this.attrToString(this.distanceTravelled, MCWLNamespaces.distanceTravelled))
        ret.push(this.attrToString(this.playtime, MCWLNamespaces.playtime))
        ret.push(this.attrToString(this.firstJoined, MCWLNamespaces.playerFirstJoined))
        return ret;
    }
    attrToString(attr: any, tagName: string): string {
        let data: PlayerData = new PlayerData(attr, typeof attr, tagName);
        return JSON.stringify(data)
    }
}