import { Block, BlockLocation, BlockPermutation, BlockProperties, BlockType, CommandReturn, ItemStack, Player } from "mojang-minecraft";
import { PotionData } from "../constants/PotionID.js";

export class DataHelper {
    static cauldronHasWater(p: Block) {
        return p.permutation.getProperty(BlockProperties.fillLevel).value != 0;
    }
    static isPotion(i: ItemStack) {
        return !(i.data == PotionData.awkward ||
            i.data == PotionData.mundane ||
            i.data == PotionData.mundane_extended ||
            i.data == PotionData.thick);
    }
    static campfireIsLit(p: Block) {
        return !(p.permutation.getProperty(BlockProperties.extinguished).value)
    }
    static isContainerEmpty(container: Block) {
        let bLoc: BlockLocation = new BlockLocation(container.location.x,-64,container.location.z);
        let obstruction: Block = container.dimension.getBlock(bLoc);
        let clone: BlockPermutation = obstruction.permutation.clone();
        let cloneType: BlockType = obstruction.type;
        container.dimension.getBlock(bLoc).setType(container.type);
        let ret1: CommandReturn; 
        try {
            ret1 = container.dimension.runCommand(`testforblocks ${container.location.x} -64 ${container.location.z} ${container.location.x} -64 ${container.location.z} ${container.location.x} ${container.location.y} ${container.location.z} all`);
            container.dimension.getBlock(bLoc).setType(cloneType);
            container.dimension.getBlock(bLoc).setPermutation(clone);
            return true;
        } catch (err) {
            container.dimension.getBlock(bLoc).setType(cloneType);
            container.dimension.getBlock(bLoc).setPermutation(clone);
            return false;
        }
    }
    static isContainerNotEmpty(container:Block) {
        return !(DataHelper.isContainerEmpty(container));
    }
    static parseCoords(args: string[],player: Player) {
        let coords = []
        let isRelative = false;
        let counter = 0;
        for (let i=0;i<args.length;i++) {
            if (args[i]==="~"){
                isRelative = true;
            } else if (isRelative==true) {
                switch (counter%3) {
                    case 0:
                        coords.push(parseInt(args[i])+Math.floor(player.location.x));
                        break;
                    case 1:
                        coords.push(parseInt(args[i])+Math.floor(player.location.y));
                        break;
                    case 2:
                        coords.push(parseInt(args[i])+Math.floor(player.location.z));
                        break;
                }
                counter+=1;
                isRelative = false;
            } else if (isRelative==false) {
                coords.push(parseInt(args[i]));
                counter+=1;
            }
        }
        return coords;
    }
    static below(bLoc:BlockLocation):BlockLocation {
        return new BlockLocation(bLoc.x,bLoc.y-1,bLoc.z);
    }
}
