import { BlockPermutation, Items, ItemStack } from "mojang-minecraft";
import { ITEM_ANY } from "./BlocksIntDB.js";
export class BlocksIntConditions {
    constructor(targetBlock, itemUsed, blockDataCheck, itemDataCheck) {
        this.targetBlock = [];
        this.itemUsed = [];
        if (blockDataCheck != null) {
            this.blockDataCheck = blockDataCheck;
        }
        if (itemDataCheck != null) {
            this.itemDataCheck = itemDataCheck;
        }
        if (Array.isArray(targetBlock)) {
            for (let i of targetBlock) {
                if (i instanceof BlockPermutation) {
                    this.targetBlock.push(i);
                }
                else {
                    this.targetBlock.push(i.createDefaultBlockPermutation());
                }
            }
        }
        else {
            if (targetBlock instanceof BlockPermutation) {
                this.targetBlock.push(targetBlock);
            }
            else {
                this.targetBlock.push(targetBlock.createDefaultBlockPermutation());
            }
        }
        if (Array.isArray(itemUsed)) {
            for (let i of itemUsed) {
                if (i instanceof ItemStack) {
                    this.itemUsed.push(i);
                }
                else {
                    this.itemUsed.push(new ItemStack(i, 1, 0));
                }
            }
        }
        else {
            if (itemUsed == ITEM_ANY) {
                this.itemUsed.push(new ItemStack(Items.get("minecraft:air"), 1, 0));
            }
            else if (itemUsed instanceof ItemStack) {
                this.itemUsed.push(itemUsed);
            }
            else {
                this.itemUsed.push(new ItemStack(itemUsed, 1, 0));
            }
        }
    }
    toJSON() {
        return Object.assign({}, this);
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, BlocksIntConditions.reviver);
        }
        else {
            let user = Object.create(BlocksIntConditions.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key, value) {
        return key === "" ? BlocksIntConditions.fromJSON(value) : value;
    }
}
