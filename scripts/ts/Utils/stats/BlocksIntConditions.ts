import { Block, BlockPermutation, BlockType, Items, ItemStack, ItemType, MinecraftBlockTypes } from "mojang-minecraft";
import { ITEM_ANY } from "./BlocksIntEntry.js";

export class BlocksIntConditions {
    targetBlock: BlockPermutation[] = []
    itemUsed: ItemStack[] = []
    any: boolean = false;
    blockDataCheck: (p:Block) => boolean
    itemDataCheck: (p:ItemStack) => boolean
    constructor(
        targetBlock: BlockType | BlockType[] | BlockPermutation | BlockPermutation[],
        itemUsed: ItemType | ItemType[] | ItemStack | ItemStack[] | string,
        blockDataCheck?: (p:Block) => boolean,
        itemDataCheck?: (p:ItemStack) => boolean) {
        if (blockDataCheck!=null) {
            this.blockDataCheck = blockDataCheck;
        } else {
            this.blockDataCheck = ((p:Block)=>{return true});
        }
        if (itemDataCheck!=null) {
            this.itemDataCheck = itemDataCheck;
        } else {
            this.itemDataCheck = ((p:ItemStack)=>{return true});
        }
        if (Array.isArray(targetBlock)) {
            for (let i of targetBlock) {
                if (i instanceof BlockPermutation) {
                    this.targetBlock.push(i as BlockPermutation);
                } else {
                    this.targetBlock.push(i.createDefaultBlockPermutation());
                }
            }
        } else {
            if (targetBlock instanceof BlockPermutation) {
                this.targetBlock.push(targetBlock as BlockPermutation);
            } else {
                this.targetBlock.push(targetBlock.createDefaultBlockPermutation());
            }
        }
        if (Array.isArray(itemUsed)) {
            for (let i of itemUsed) {
                if (i instanceof ItemStack) {
                    this.itemUsed.push(i as ItemStack);
                } else {
                    this.itemUsed.push(new ItemStack(i, 1, 0));
                }
            }
        } else {
            if ((typeof itemUsed)=='string') {
                this.any = true;
            } else if (itemUsed instanceof ItemStack) {
                this.itemUsed.push(itemUsed as ItemStack);
            } else {
                this.itemUsed.push(new ItemStack(itemUsed as ItemType, 1, 0));
            }
        }
    }
    toJSON(): BlocksIntJSONData {
        return Object.assign({}, this);
    }
    static fromJSON(json: BlocksIntJSONData | string): BlocksIntConditions {
        if (typeof json === 'string') {
            return JSON.parse(json, BlocksIntConditions.reviver);
        } else {
            let user = Object.create(BlocksIntConditions.prototype);
            return Object.assign(user, json);
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? BlocksIntConditions.fromJSON(value) : value;
    }
}
export interface BlocksIntJSONData {
    targetBlock: BlockPermutation[]
    itemUsed: ItemStack[]
    any: boolean
}