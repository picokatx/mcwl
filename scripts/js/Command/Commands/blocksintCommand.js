import * as Minecraft from "mojang-minecraft";
import { CommandFormat, CommandParameter, ARG_STRING, ARG_RADIO } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { PlayerTag } from "../../Utils/data/PlayerTag.js";
import { printStream } from "../../Main.js";
import { BlockStatDB } from "../../Utils/stats/BlockStatDB.js";
import { Items, MinecraftBlockTypes } from "mojang-minecraft";
import { BlocksIntConditions } from "../../Utils/stats/BlocksIntConditions.js";
import { ITEM_ANY } from "../../Utils/stats/BlocksIntDB.js";
import { DataHelper } from "../../Utils/data/DataHelper.js";
export const blockIntNamespaces = new Map([
    ["dpm:clean_armor", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:leather_helmet"),
            Items.get("minecraft:leather_chestplate"),
            Items.get("minecraft:leather_leggings"),
            Items.get("minecraft:leather_boots")
        ], DataHelper.cauldronHasWater)],
    ["dpm:clean_banner", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:banner"), DataHelper.cauldronHasWater)],
    ["dpm:open_barrel", new BlocksIntConditions(MinecraftBlockTypes.barrel, ITEM_ANY)],
    ["dpm:bell_ring", new BlocksIntConditions(MinecraftBlockTypes.bell, ITEM_ANY)],
    ["dpm:eat_cake_slice", new BlocksIntConditions(MinecraftBlockTypes.cake, ITEM_ANY)],
    ["dpm:fill_cauldron_water", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:water_bucket"))],
    ["dpm:fill_cauldron_lava", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:lava_bucket"))],
    ["dpm:fill_cauldron_powderSnow", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:powder_snow_bucket"))],
    ["dpm:fill_cauldron_potion", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:potion"),
            Items.get("minecraft:lingering_potion"),
            Items.get("minecraft:splash_potion")
        ], null, DataHelper.isPotion)],
    ["dpm:open_chest", new BlocksIntConditions(MinecraftBlockTypes.chest, ITEM_ANY)],
    ["dpm:inspect_dispenser", new BlocksIntConditions(MinecraftBlockTypes.dispenser, ITEM_ANY)],
    ["dpm:inspect_dropper", new BlocksIntConditions(MinecraftBlockTypes.dropper, ITEM_ANY)],
    ["dpm:open_enderchest", new BlocksIntConditions(MinecraftBlockTypes.enderChest, ITEM_ANY)],
    ["dpm:inspect_hopper", new BlocksIntConditions(MinecraftBlockTypes.hopper, ITEM_ANY)],
    ["dpm:interact_with_anvil", new BlocksIntConditions(MinecraftBlockTypes.anvil, ITEM_ANY)],
    ["dpm:interact_with_beacon", new BlocksIntConditions(MinecraftBlockTypes.beacon, ITEM_ANY)],
    ["dpm:interact_with_blast_furnace", new BlocksIntConditions(MinecraftBlockTypes.blastFurnace, ITEM_ANY)],
    ["dpm:interact_with_brewingstand", new BlocksIntConditions(MinecraftBlockTypes.brewingStand, ITEM_ANY)],
    ["dpm:interact_with_campfire", new BlocksIntConditions([
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
    ["dpm:interact_with_cartography_table", new BlocksIntConditions(MinecraftBlockTypes.cartographyTable, ITEM_ANY)],
    ["dpm:interact_with_crafting_table", new BlocksIntConditions(MinecraftBlockTypes.craftingTable, ITEM_ANY)],
    ["dpm:interact_with_furnace", new BlocksIntConditions(MinecraftBlockTypes.furnace, ITEM_ANY)],
    ["dpm:interact_with_grindstone", new BlocksIntConditions(MinecraftBlockTypes.grindstone, ITEM_ANY)],
    ["dpm:place_book_on_lectern", new BlocksIntConditions(MinecraftBlockTypes.lectern, ITEM_ANY, DataHelper.isContainerEmpty)],
    ["dpm:read_book_on_lectern", new BlocksIntConditions(MinecraftBlockTypes.lectern, ITEM_ANY, DataHelper.isContainerNotEmpty)],
    ["dpm:interact_with_loom", new BlocksIntConditions(MinecraftBlockTypes.loom, ITEM_ANY)],
    ["dpm:interact_with_smithing_table", new BlocksIntConditions(MinecraftBlockTypes.smithingTable, ITEM_ANY)],
    ["dpm:interact_with_smoker", new BlocksIntConditions(MinecraftBlockTypes.smoker, ITEM_ANY)],
    ["dpm:interact_with_stonecutter", new BlocksIntConditions(MinecraftBlockTypes.stonecutterBlock, ITEM_ANY)],
    ["dpm:play_record", new BlocksIntConditions(MinecraftBlockTypes.jukebox, [
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
    ["dpm:tune_noteblock", new BlocksIntConditions(MinecraftBlockTypes.noteblock, ITEM_ANY)],
    ["dpm:pot_flower", new BlocksIntConditions(MinecraftBlockTypes.flowerPot, [
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
    ["dpm:clean_shulker_box", new BlocksIntConditions(MinecraftBlockTypes.cauldron, [
            Items.get("minecraft:shulker_box"),
            Items.get("minecraft:undyed_shulker_box")
        ], DataHelper.cauldronHasWater)],
    ["dpm:open_shulker_box", new BlocksIntConditions([MinecraftBlockTypes.shulkerBox, MinecraftBlockTypes.undyedShulkerBox], ITEM_ANY)],
    ["dpm:trigger_trapped_chest", new BlocksIntConditions(MinecraftBlockTypes.trappedChest, ITEM_ANY)],
    ["dpm:use_cauldron", new BlocksIntConditions(MinecraftBlockTypes.cauldron, Items.get("minecraft:glass_bottle"), DataHelper.cauldronHasWater)]
]);
function blocksint(player, args, subCmd) {
    Minecraft.BlockWaterContainerComponent;
    switch (subCmd) {
        case 0:
            let players = Minecraft.world.getPlayers();
            for (let i of players) {
                if (i.name == args.get("target")) {
                    let r = PlayerTag.read(i, "dpm:block_interactions");
                    let bsEntry = new BlockStatDB(r.data);
                    let entry = bsEntry.getEntryById(args.get("blockName"));
                    if (args.get("statType") == "blocksBroken") {
                        return [`${entry.blocksBroken} ${args.get("blockName")} have been broken by ${args.get("target")}`, 0];
                    }
                    else {
                        return [`${entry.blocksPlaced} ${args.get("blockName")} have been placed by ${args.get("target")}`, 0];
                    }
                }
            }
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function bellsrungSucceed(suc) {
    printStream.success(suc);
}
function bellsrungFail(err) {
    printStream.failure(err);
}
function bellsrungInfo(inf) {
    printStream.info(inf);
}
const bellsrungCmd = new Command("bellsrung", "Displays number of interactions with block", [
    new CommandFormat([
        new CommandParameter("target", ARG_STRING, false),
        new CommandParameter("statType", ARG_RADIO([blockIntNamespaces.keys()]), false),
    ])
], blocksint, bellsrungSucceed, bellsrungFail, bellsrungInfo, 3);
export { bellsrungCmd };
