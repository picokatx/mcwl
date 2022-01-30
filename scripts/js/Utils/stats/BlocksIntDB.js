import { Items, MinecraftBlockTypes } from "mojang-minecraft";
import { MCWLNamespaces } from "../constants/MCWLNamespaces.js";
import { DataHelper } from "../data/DataHelper.js";
import { PlayerData } from "../data/PlayerData.js";
import { PlayerTag } from "../data/PlayerTag.js";
import { BlocksIntConditions } from "./BlocksIntConditions.js";
import { BlocksIntEntry, ITEM_ANY } from "./BlocksIntEntry.js";
export let defaultBlockIntDB = [
    new BlocksIntEntry("mcwl:clean_armor"),
    new BlocksIntEntry("mcwl:clean_banner"),
    new BlocksIntEntry("mcwl:open_barrel"),
    new BlocksIntEntry("mcwl:bell_ring"),
    new BlocksIntEntry("mcwl:eat_cake_slice"),
    new BlocksIntEntry("mcwl:fill_cauldron_water"),
    new BlocksIntEntry("mcwl:fill_cauldron_lava"),
    new BlocksIntEntry("mcwl:fill_cauldron_powderSnow"),
    new BlocksIntEntry("mcwl:fill_cauldron_potion"),
    new BlocksIntEntry("mcwl:open_chest"),
    new BlocksIntEntry("mcwl:inspect_dispenser"),
    new BlocksIntEntry("mcwl:inspect_dropper"),
    new BlocksIntEntry("mcwl:open_enderchest"),
    new BlocksIntEntry("mcwl:inspect_hopper"),
    new BlocksIntEntry("mcwl:interact_with_anvil"),
    new BlocksIntEntry("mcwl:interact_with_beacon"),
    new BlocksIntEntry("mcwl:interact_with_blast_furnace"),
    new BlocksIntEntry("mcwl:interact_with_brewingstand"),
    new BlocksIntEntry("mcwl:interact_with_campfire"),
    new BlocksIntEntry("mcwl:interact_with_cartography_table"),
    new BlocksIntEntry("mcwl:interact_with_crafting_table"),
    new BlocksIntEntry("mcwl:interact_with_furnace"),
    new BlocksIntEntry("mcwl:interact_with_grindstone"),
    new BlocksIntEntry("mcwl:place_book_on_lectern"),
    new BlocksIntEntry("mcwl:read_book_on_lectern"),
    new BlocksIntEntry("mcwl:interact_with_loom"),
    new BlocksIntEntry("mcwl:interact_with_smithing_table"),
    new BlocksIntEntry("mcwl:interact_with_smoker"),
    new BlocksIntEntry("mcwl:interact_with_stonecutter"),
    new BlocksIntEntry("mcwl:play_record"),
    new BlocksIntEntry("mcwl:tune_noteblock"),
    new BlocksIntEntry("mcwl:pot_flower"),
    new BlocksIntEntry("mcwl:clean_shulker_box"),
    new BlocksIntEntry("mcwl:open_shulker_box"),
    new BlocksIntEntry("mcwl:trigger_trapped_chest"),
    new BlocksIntEntry("mcwl:use_cauldron")
];
export const blockIntNamespaces = new Map([
    ["mcwl:clean_armor", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:leather_helmet"),
            Items.get("minecraft:leather_chestplate"),
            Items.get("minecraft:leather_leggings"),
            Items.get("minecraft:leather_boots")
        ], DataHelper.cauldronHasWater)],
    ["mcwl:clean_banner", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:banner"), DataHelper.cauldronHasWater)],
    ["mcwl:open_barrel", new BlocksIntConditions(MinecraftBlockTypes.barrel, ITEM_ANY)],
    ["mcwl:bell_ring", new BlocksIntConditions(MinecraftBlockTypes.bell, ITEM_ANY)],
    ["mcwl:eat_cake_slice", new BlocksIntConditions(MinecraftBlockTypes.cake, ITEM_ANY)],
    ["mcwl:fill_cauldron_water", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:water_bucket"))],
    ["mcwl:fill_cauldron_lava", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:lava_bucket"))],
    ["mcwl:fill_cauldron_powderSnow", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:powder_snow_bucket"))],
    ["mcwl:fill_cauldron_potion", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:potion"),
            Items.get("minecraft:lingering_potion"),
            Items.get("minecraft:splash_potion")
        ], null, DataHelper.isPotion)],
    ["mcwl:open_chest", new BlocksIntConditions(MinecraftBlockTypes.chest, ITEM_ANY)],
    ["mcwl:inspect_dispenser", new BlocksIntConditions(MinecraftBlockTypes.dispenser, ITEM_ANY)],
    ["mcwl:inspect_dropper", new BlocksIntConditions(MinecraftBlockTypes.dropper, ITEM_ANY)],
    ["mcwl:open_enderchest", new BlocksIntConditions(MinecraftBlockTypes.enderChest, ITEM_ANY)],
    ["mcwl:inspect_hopper", new BlocksIntConditions(MinecraftBlockTypes.hopper, ITEM_ANY)],
    ["mcwl:interact_with_anvil", new BlocksIntConditions(MinecraftBlockTypes.anvil, ITEM_ANY)],
    ["mcwl:interact_with_beacon", new BlocksIntConditions(MinecraftBlockTypes.beacon, ITEM_ANY)],
    ["mcwl:interact_with_blast_furnace", new BlocksIntConditions(MinecraftBlockTypes.blastFurnace, ITEM_ANY)],
    ["mcwl:interact_with_brewingstand", new BlocksIntConditions(MinecraftBlockTypes.brewingStand, ITEM_ANY)],
    ["mcwl:interact_with_campfire", new BlocksIntConditions([
            MinecraftBlockTypes.campfire,
            MinecraftBlockTypes.soulCampfire
        ], [
            Items.get("minecraft:chicken"),
            Items.get("minecraft:beef"),
            Items.get("minecraft:rabbit"),
            Items.get("minecraft:porkchop"),
            Items.get("minecraft:mutton"),
            Items.get("minecraft:salmon"),
            Items.get("minecraft:cod"),
            Items.get("minecraft:potatoes"),
            Items.get("minecraft:kelp")
        ], DataHelper.campfireIsLit)],
    ["mcwl:interact_with_cartography_table", new BlocksIntConditions(MinecraftBlockTypes.cartographyTable, ITEM_ANY)],
    ["mcwl:interact_with_crafting_table", new BlocksIntConditions(MinecraftBlockTypes.craftingTable, ITEM_ANY)],
    ["mcwl:interact_with_furnace", new BlocksIntConditions(MinecraftBlockTypes.furnace, ITEM_ANY)],
    ["mcwl:interact_with_grindstone", new BlocksIntConditions(MinecraftBlockTypes.grindstone, ITEM_ANY)],
    ["mcwl:place_book_on_lectern", new BlocksIntConditions(MinecraftBlockTypes.lectern, ITEM_ANY, DataHelper.isContainerEmpty)],
    ["mcwl:read_book_on_lectern", new BlocksIntConditions(MinecraftBlockTypes.lectern, ITEM_ANY, DataHelper.isContainerNotEmpty)],
    ["mcwl:interact_with_loom", new BlocksIntConditions(MinecraftBlockTypes.loom, ITEM_ANY)],
    ["mcwl:interact_with_smithing_table", new BlocksIntConditions(MinecraftBlockTypes.smithingTable, ITEM_ANY)],
    ["mcwl:interact_with_smoker", new BlocksIntConditions(MinecraftBlockTypes.smoker, ITEM_ANY)],
    ["mcwl:interact_with_stonecutter", new BlocksIntConditions(MinecraftBlockTypes.stonecutterBlock, ITEM_ANY)],
    ["mcwl:play_record", new BlocksIntConditions(MinecraftBlockTypes.jukebox, [
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
        ], DataHelper.isContainerEmpty)],
    ["mcwl:tune_noteblock", new BlocksIntConditions(MinecraftBlockTypes.noteblock, ITEM_ANY)],
    ["mcwl:pot_flower", new BlocksIntConditions(MinecraftBlockTypes.flowerPot, [
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
        ], DataHelper.isContainerEmpty)],
    ["mcwl:clean_shulker_box", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:shulker_box"),
            Items.get("minecraft:undyed_shulker_box")
        ], DataHelper.cauldronHasWater)],
    ["mcwl:open_shulker_box", new BlocksIntConditions([MinecraftBlockTypes.shulkerBox, MinecraftBlockTypes.undyedShulkerBox], ITEM_ANY)],
    ["mcwl:trigger_trapped_chest", new BlocksIntConditions(MinecraftBlockTypes.trappedChest, ITEM_ANY)],
    ["mcwl:use_cauldron", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:glass_bottle"), DataHelper.cauldronHasWater)]
]);
export class BlocksIntDB {
    constructor(db) {
        if (db == null) {
            this.db = defaultBlockIntDB;
        }
        else {
            this.db = db;
        }
    }
    add(stat) {
        this.getEntryById(stat).count += 1;
    }
    set(stat, val) {
        this.getEntryById(stat).count = val;
    }
    getEntryById(stat) {
        for (let i of this.db) {
            if (i.stat == stat) {
                return i;
            }
        }
    }
    initialize(playerMap, player, defaultValue) {
        if (!PlayerTag.hasTag(player, MCWLNamespaces.blockInteractions)) {
            playerMap.set(player, defaultValue);
        }
        else {
            this.db = PlayerTag.read(player, MCWLNamespaces.blockInteractions).data;
            playerMap.set(player, this);
        }
    }
    saveToTag(player) {
        let data = new PlayerData(this.db, "object", MCWLNamespaces.blockInteractions);
        let tag = new PlayerTag(data);
        tag.write(player);
    }
    toJSONString() {
        return JSON.stringify(new PlayerData(this.db, "object", MCWLNamespaces.blockInteractions));
    }
}
