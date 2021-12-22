import { Block, BlockPermutation, BlockType, Items, ItemStack, ItemType, MinecraftBlockTypes } from "mojang-minecraft";
import { blockIntNamespaces } from "../../Command/Commands/blocksintCommand.js";
import { ITEM_ANY } from "./BlocksIntDB.js";

export class BlocksIntConditions {
    targetBlock: BlockPermutation[] = []
    itemUsed: ItemStack[] = []
    blockDataCheck: (p:Block) => boolean
    itemDataCheck: (p:ItemStack) => boolean
    constructor(
        targetBlock: BlockType | BlockType[] | BlockPermutation | BlockPermutation[],
        itemUsed: ItemType | ItemType[] | ItemStack | ItemStack[],
        blockDataCheck?: (p:Block) => boolean,
        itemDataCheck?: (p:ItemStack) => boolean) {
        if (blockDataCheck!=null) {
            this.blockDataCheck = blockDataCheck;
        }
        if (itemDataCheck!=null) {
            this.itemDataCheck = itemDataCheck;
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
            if (itemUsed==ITEM_ANY) {
                this.itemUsed.push(new ItemStack(Items.get("minecraft:air"),1,0));
            } else if (itemUsed instanceof ItemStack) {
                this.itemUsed.push(itemUsed as ItemStack);
            } else {
                this.itemUsed.push(new ItemStack(itemUsed, 1, 0));
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
}