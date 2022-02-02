import { Player } from "mojang-minecraft";
import { BaseTagEntry } from "./BaseTagEntry.js";

export interface BaseTagDB {
    db: BaseTagEntry[];
    add(stat: string, dataType?: string): void
    set(stat: string, val: number, dataType?: string): void
    getEntryById(stat: string): BaseTagEntry
    initialize(playerMap: Map<Player, any>, player: Player, defaultValue: any): void
    saveToTag(player: Player): void
}