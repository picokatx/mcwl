export class PlayerBlockSelection {
    constructor(player, block) {
        this.player = player;
        this.blockID = block.id;
        this.blockLoc = block.location;
    }
}
