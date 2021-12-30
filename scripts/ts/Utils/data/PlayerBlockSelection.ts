import { Block, BlockLocation, Player } from "mojang-minecraft";

export class PlayerBlockSelection {
    player: Player
    blockID: string
    blockLoc: BlockLocation
    constructor(player:Player, block:Block) {
        this.player = player
        this.blockID = block.id
        this.blockLoc = block.location
    }
}