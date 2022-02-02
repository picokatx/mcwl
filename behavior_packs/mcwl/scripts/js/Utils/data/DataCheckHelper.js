import { BlockLocation, BlockProperties } from "mojang-minecraft";
import { PotionData } from "../constants/PotionID.js";
export class DataCheckHelper {
    static cauldronHasWater(p) {
        return p.permutation.getProperty(BlockProperties.fillLevel).value != 0;
    }
    static isPotion(i) {
        return !(i.data == PotionData.awkward ||
            i.data == PotionData.mundane ||
            i.data == PotionData.mundane_extended ||
            i.data == PotionData.thick);
    }
    static campfireIsLit(p) {
        return !(p.permutation.getProperty(BlockProperties.extinguished).value);
    }
    static isContainerEmpty(container) {
        let bLoc = new BlockLocation(container.location.x, -64, container.location.z);
        let obstruction = container.dimension.getBlock(bLoc);
        let clone = obstruction.permutation.clone();
        let cloneType = obstruction.type;
        container.dimension.getBlock(bLoc).setType(container.type);
        let ret1;
        try {
            ret1 = container.dimension.runCommand(`testforblocks ${container.location.x} -64 ${container.location.z} ${container.location.x} -64 ${container.location.z} ${container.location.x} ${container.location.y} ${container.location.z} all`);
            container.dimension.getBlock(bLoc).setType(cloneType);
            container.dimension.getBlock(bLoc).setPermutation(clone);
            return true;
        }
        catch (err) {
            container.dimension.getBlock(bLoc).setType(cloneType);
            container.dimension.getBlock(bLoc).setPermutation(clone);
            return false;
        }
    }
    static isContainerNotEmpty(container) {
        return !this.isContainerEmpty(container);
    }
}
