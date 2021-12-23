import { Items, MinecraftBlockTypes } from "mojang-minecraft";
import { DataHelper } from "../data/DataHelper.js";
import { BlocksIntConditions } from "./BlocksIntConditions.js";
import { BlocksIntEntry, ITEM_ANY } from "./BlocksIntEntry.js";
export let defaultBlockIntDB: BlocksIntEntry[] = [
    new BlocksIntEntry("dpm:clean_armor"),
    new BlocksIntEntry("dpm:clean_banner"),
    new BlocksIntEntry("dpm:open_barrel"),
    new BlocksIntEntry("dpm:bell_ring"),
    new BlocksIntEntry("dpm:eat_cake_slice"),
    new BlocksIntEntry("dpm:fill_cauldron_water"),
    new BlocksIntEntry("dpm:fill_cauldron_lava"),
    new BlocksIntEntry("dpm:fill_cauldron_powderSnow"),
    new BlocksIntEntry("dpm:fill_cauldron_potion"),
    new BlocksIntEntry("dpm:open_chest"),
    new BlocksIntEntry("dpm:inspect_dispenser"),
    new BlocksIntEntry("dpm:inspect_dropper"),
    new BlocksIntEntry("dpm:open_enderchest"),
    new BlocksIntEntry("dpm:inspect_hopper"),
    new BlocksIntEntry("dpm:interact_with_anvil"),
    new BlocksIntEntry("dpm:interact_with_beacon"),
    new BlocksIntEntry("dpm:interact_with_blast_furnace"),
    new BlocksIntEntry("dpm:interact_with_brewingstand"),
    new BlocksIntEntry("dpm:interact_with_campfire"),
    new BlocksIntEntry("dpm:interact_with_cartography_table"),
    new BlocksIntEntry("dpm:interact_with_crafting_table"),
    new BlocksIntEntry("dpm:interact_with_furnace"),
    new BlocksIntEntry("dpm:interact_with_grindstone"),
    new BlocksIntEntry("dpm:place_book_on_lectern"),
    new BlocksIntEntry("dpm:read_book_on_lectern"),
    new BlocksIntEntry("dpm:interact_with_loom"),
    new BlocksIntEntry("dpm:interact_with_smithing_table"),
    new BlocksIntEntry("dpm:interact_with_smoker"),
    new BlocksIntEntry("dpm:interact_with_stonecutter"),
    new BlocksIntEntry("dpm:play_record"),
    new BlocksIntEntry("dpm:tune_noteblock"),
    new BlocksIntEntry("dpm:pot_flower"),
    new BlocksIntEntry("dpm:clean_shulker_box"),
    new BlocksIntEntry("dpm:open_shulker_box"),
    new BlocksIntEntry("dpm:trigger_trapped_chest"),
    new BlocksIntEntry("dpm:use_cauldron")
]
export const blockIntNamespaces: Map<string, BlocksIntConditions> = new Map<string, BlocksIntConditions>([
    ["dpm:clean_armor", new BlocksIntConditions(
        MinecraftBlockTypes.cauldron,
        [
            Items.get("minecraft:leather_helmet"),
            Items.get("minecraft:leather_chestplate"),
            Items.get("minecraft:leather_leggings"),
            Items.get("minecraft:leather_boots")
        ],
        DataHelper.cauldronHasWater
    )],
    ["dpm:clean_banner", new BlocksIntConditions(
        MinecraftBlockTypes.cauldron,
        Items.get("minecraft:banner"),
        DataHelper.cauldronHasWater
    )],
    ["dpm:open_barrel", new BlocksIntConditions(MinecraftBlockTypes.barrel, ITEM_ANY)],
    ["dpm:bell_ring", new BlocksIntConditions(MinecraftBlockTypes.bell, ITEM_ANY)],
    ["dpm:eat_cake_slice", new BlocksIntConditions(MinecraftBlockTypes.cake, ITEM_ANY)],
    ["dpm:fill_cauldron_water", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:water_bucket"))],
    ["dpm:fill_cauldron_lava", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:lava_bucket"))],
    ["dpm:fill_cauldron_powderSnow", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:powder_snow_bucket"))],
    ["dpm:fill_cauldron_potion", new BlocksIntConditions(
        MinecraftBlockTypes.cauldron,
        [
            Items.get("minecraft:potion"),
            Items.get("minecraft:lingering_potion"),
            Items.get("minecraft:splash_potion")
        ],
        null,
        DataHelper.isPotion
    )],
    ["dpm:open_chest", new BlocksIntConditions(MinecraftBlockTypes.chest, ITEM_ANY)],
    ["dpm:inspect_dispenser", new BlocksIntConditions(MinecraftBlockTypes.dispenser, ITEM_ANY)],
    ["dpm:inspect_dropper", new BlocksIntConditions(MinecraftBlockTypes.dropper, ITEM_ANY)],
    ["dpm:open_enderchest", new BlocksIntConditions(MinecraftBlockTypes.enderChest, ITEM_ANY)],
    ["dpm:inspect_hopper", new BlocksIntConditions(MinecraftBlockTypes.hopper, ITEM_ANY)],
    ["dpm:interact_with_anvil", new BlocksIntConditions(MinecraftBlockTypes.anvil, ITEM_ANY)],
    ["dpm:interact_with_beacon", new BlocksIntConditions(MinecraftBlockTypes.beacon, ITEM_ANY)],
    ["dpm:interact_with_blast_furnace", new BlocksIntConditions(MinecraftBlockTypes.blastFurnace, ITEM_ANY)],
    ["dpm:interact_with_brewingstand", new BlocksIntConditions(MinecraftBlockTypes.brewingStand, ITEM_ANY)],
    ["dpm:interact_with_campfire", new BlocksIntConditions(
        [
            MinecraftBlockTypes.campfire,
            MinecraftBlockTypes.soulCampfire
        ],
        [
            Items.get("minecraft:chicken"),
            Items.get("minecraft:beef"),
            Items.get("minecraft:rabbit"),
            Items.get("minecraft:porkchop"),
            Items.get("minecraft:mutton"),
            Items.get("minecraft:salmon"),
            Items.get("minecraft:cod"),
            Items.get("minecraft:potatoes"),
            Items.get("minecraft:kelp")
        ],
        DataHelper.campfireIsLit
    )],
    ["dpm:interact_with_cartography_table", new BlocksIntConditions(MinecraftBlockTypes.cartographyTable, ITEM_ANY)],
    ["dpm:interact_with_crafting_table", new BlocksIntConditions(MinecraftBlockTypes.craftingTable, ITEM_ANY)],
    ["dpm:interact_with_furnace", new BlocksIntConditions(MinecraftBlockTypes.furnace, ITEM_ANY)],
    ["dpm:interact_with_grindstone", new BlocksIntConditions(MinecraftBlockTypes.grindstone, ITEM_ANY)],
    ["dpm:place_book_on_lectern", new BlocksIntConditions(
        MinecraftBlockTypes.lectern,
        ITEM_ANY,
        DataHelper.isContainerEmpty
    )],
    ["dpm:read_book_on_lectern", new BlocksIntConditions(
        MinecraftBlockTypes.lectern,
        ITEM_ANY,
        DataHelper.isContainerNotEmpty
    )],
    ["dpm:interact_with_loom", new BlocksIntConditions(MinecraftBlockTypes.loom, ITEM_ANY)],
    ["dpm:interact_with_smithing_table", new BlocksIntConditions(MinecraftBlockTypes.smithingTable, ITEM_ANY)],
    ["dpm:interact_with_smoker", new BlocksIntConditions(MinecraftBlockTypes.smoker, ITEM_ANY)],
    ["dpm:interact_with_stonecutter", new BlocksIntConditions(MinecraftBlockTypes.stonecutterBlock, ITEM_ANY)],
    ["dpm:play_record", new BlocksIntConditions(
        MinecraftBlockTypes.jukebox,
        [
            Items.get("minecraft:music_disc_11"),
            Items.get("minecraft:music_disc_13"),
            Items.get("minecraft:music_disc_blocks"),
            Items.get("minecraft:music_disc_cat"),
            Items.get("minecraft:music_disc_chirp"),
            Items.get("minecraft:music_disc_far"),
            Items.get("minecraft:music_disc_mall"),
            Items.get("minecraft:music_disc_mellohi"),
            Items.get("minecraft:music_disc_otherside"),
            Items.get("minecraft:music_disc_pigstep"),
            Items.get("minecraft:music_disc_stal"),
            Items.get("minecraft:music_disc_strad"),
            Items.get("minecraft:music_disc_wait"),
            Items.get("minecraft:music_disc_ward")
        ],
        DataHelper.isContainerEmpty
    )],
    ["dpm:tune_noteblock", new BlocksIntConditions(MinecraftBlockTypes.noteblock, ITEM_ANY)],
    ["dpm:pot_flower", new BlocksIntConditions(
        MinecraftBlockTypes.flowerPot,
        [
            Items.get("minecraft:red_flower"),
            Items.get("minecraft:yellow_flower"),
            Items.get("minecraft:flowering_azalea"),
            Items.get("minecraft:azalea"),
            Items.get("minecraft:sapling"),
            Items.get("minecraft:bamboo"),
            Items.get("minecraft:wither_rose"),
            Items.get("minecraft:red_mushroom"),
            Items.get("minecraft:brown_mushroom"),
            Items.get("minecraft:deadbush"),
            Items.get("minecraft:cactus"),
            Items.get("minecraft:crimson_fungus"),
            Items.get("minecraft:crimson_roots"),
            Items.get("minecraft:warped_fungus"),
            Items.get("minecraft:warped_roots")
        ],
        DataHelper.isContainerEmpty
    )],
    ["dpm:clean_shulker_box", new BlocksIntConditions(
        MinecraftBlockTypes.cauldron,
        [
            Items.get("minecraft:shulker_box"),
            Items.get("minecraft:undyed_shulker_box")
        ],
        DataHelper.cauldronHasWater
    )],
    ["dpm:open_shulker_box", new BlocksIntConditions([MinecraftBlockTypes.shulkerBox, MinecraftBlockTypes.undyedShulkerBox], ITEM_ANY)],
    ["dpm:trigger_trapped_chest", new BlocksIntConditions(MinecraftBlockTypes.trappedChest, ITEM_ANY)],
    ["dpm:use_cauldron", new BlocksIntConditions(
        MinecraftBlockTypes.cauldron,
        Items.get("minecraft:glass_bottle"),
        DataHelper.cauldronHasWater
    )]
])

export class BlocksIntDB {
    db: BlocksIntEntry[];
    constructor(db?: BlocksIntEntry[]) {
        if (db==null) {
            this.db = defaultBlockIntDB;
        } else {
            this.db = db;
        }
    }
    add(stat: string) {
        this.getEntryById(stat).count += 1;
    }
    set(stat: string,val: number) {
        this.getEntryById(stat).count = val;
    }
    getEntryById(stat: string): BlocksIntEntry {
        for (let i of this.db) {
            if (i.stat==stat) {
                return i;
            }
        }
    }
}