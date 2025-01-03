export const Locale_EN_GB = new Map([
    ["player_welcome", "Welcome %s. This server has MCWL installed. For a list of all commands, type ,help in chat."],
    ["cmd_not_found", "Command not found. Use ,help for a list of all commands."],
    ["cmd_return_default", "Command format does not exist, use ,help %s for a list of all command formats."],
    ["cmd_name_ascend", "ascend"],
    ["cmd_name_blocksint", "blocksint"],
    ["cmd_name_blocksmodified", "blocksmodified"],
    ["cmd_name_crouchtime", "crouchtime"],
    ["cmd_name_damagetaken", "damagetaken"],
    ["cmd_name_deaths", "deaths"],
    ["cmd_name_debug", "debug"],
    ["cmd_name_descend", "descend"],
    ["cmd_name_drain", "drain"],
    ["cmd_name_line", "line"],
    ["cmd_name_distancemoved", "distancemoved"],
    ["cmd_name_entitykilled", "entitykilled"],
    ["cmd_name_firstjoined", "firstjoined"],
    ["cmd_name_floor", "floor"],
    ["cmd_name_goto", "goto"],
    ["cmd_name_help", "help"],
    ["cmd_name_jump", "jump"],
    ["cmd_name_lastdied", "lastdied"],
    ["cmd_name_playerjoined", "playerjoined"],
    ["cmd_name_playtime", "playtime"],
    ["cmd_name_raidstriggered", "raidstriggered"],
    ["cmd_name_savedb", "savedb"],
    ["cmd_name_setblock", "setblock"],
    ["cmd_name_sleepinbed", "sleepinbed"],
    ["cmd_name_spawn", "spawn"],
    ["cmd_name_spawnplayer", "spawnplayer"],
    ["cmd_name_sudo", "sudo"],
    ["cmd_name_timesincerest", "timesincerest"],
    ["cmd_name_top", "top"],
    ["cmd_description_ascend", "Teleports player to upper level."],
    ["cmd_description_blocksint", "Displays number of interactions with blocks."],
    ["cmd_description_blocksmodified", "Displays number of blocks modified by player."],
    ["cmd_description_crouchtime", "Displays total time player has sneaked in ticks."],
    ["cmd_description_deaths", "Displays number of time player has died"],
    ["cmd_description_debug", "Debug command for debugging"],
    ["cmd_description_descend", "Teleports player to lower level."],
    ["cmd_description_distancemoved", "Displays total distance travelled by player."],
    ["cmd_description_drain", "Drains water from given source"],
    ["cmd_description_entitykilled", "Displays number of times entity is killed by player."],
    ["cmd_description_firstjoined", "Displays date of player's first login to the server."],
    ["cmd_description_floor", "Teleports player to the highest solid block below them."],
    ["cmd_description_goto", "Teleports player to the nearest block on crosshair."],
    ["cmd_description_help", "Pov you forgot your own command syntax smh."],
    ["cmd_description_jump", "Displays number of times player has jumped"],
    ["cmd_description_lastdied", "Displays time since player has last died in ticks"],
    ["cmd_description_playerjoined", "Displays number of times player has joined world."],
    ["cmd_description_playtime", "Displays playtime of player."],
    ["cmd_description_raidstriggered", "Displays number of raids triggered by player."],
    ["cmd_description_savedb", "Manually save your statistics"],
    ["cmd_description_setblock", "Fills a block location with specified block."],
    ["cmd_description_sleepinbed", "Displays number of times player has slept"],
    ["cmd_description_spawn", "Spawns entities."],
    ["cmd_description_spawnplayer", "Spawns a Simulated Player."],
    ["cmd_description_sudo", "Changes name shown in chat."],
    ["cmd_description_timesincerest", "Displays time since the player has last slept"],
    ["cmd_description_top", "Teleports player to the highest solid block above them."],
    ["cmd_return_ascend_0_failure", "Unable to find teleport location."],
    ["cmd_return_ascend_0_success", "Ascended %d levels."],
    ["cmd_return_ascend_1_failure", "Unable to find teleport location."],
    ["cmd_return_ascend_1_success", "Ascended %d levels."],
    ["cmd_return_ascend_2_failure", "Unable to find teleport location."],
    ["cmd_return_ascend_2_success", "Ascended 1 level."],
    ["cmd_return_blocksint_0_info", "Username: %s, [%s] : %d"],
    ["cmd_return_blocksmodified_0_broken_info", "%s has broken %d %s."],
    ["cmd_return_blocksmodified_0_placed_info", "%s has placed %d %s."],
    ["cmd_return_blocksmodified_0_failure", "Block Name %s is invalid."],
    ["cmd_return_line_0_success", "%s line drawn from %d %d %d to %d %d %d"],
    ["cmd_return_line_1_success", "%s line drawn from %d %d %d to %d %d %d"],
    ["cmd_return_crouchtime_0_info", "%s has crouched a total of %d game ticks."],
    ["cmd_return_deaths_0_info", "%s has died %d times"],
    ["cmd_return_spawnplayer_0_success", "Simulated Player jumps outside of GameTest scope"],
    ["cmd_return_damagetaken_0_success", "%s has %s health"],
    ["cmd_return_debug_0_success", "%s has %d health"],
    ["cmd_return_descend_0_failure", "Unable to find teleport location."],
    ["cmd_return_descend_0_success", "Descended %d levels."],
    ["cmd_return_descend_1_failure", "Unable to find teleport location."],
    ["cmd_return_descend_1_success", "Descended %d levels."],
    ["cmd_return_descend_2_failure", "Unable to find teleport location."],
    ["cmd_return_descend_2_success", "Descended 1 level."],
    ["cmd_return_distancemoved_0_info", "%s has travelled a total of %d blocks ingame."],
    ["cmd_return_drain_0_success", "%d blocks drained"],
    ["cmd_return_entitykilled_0_info", "%s has killed %d of entity %s"],
    ["cmd_return_firstjoined_0_info", "%s first joined this world on %s"],
    ["cmd_return_floor_0_failure", "Unable to find teleport location."],
    ["cmd_return_floor_0_success", "Teleported %s to floor."],
    ["cmd_return_goto_0_success", "%s teleported from [%d, %d, %d] to [%d, %d, %d]."],
    ["cmd_return_goto_0_failure", "Solid Blocks on cursor not found."],
    ["cmd_return_help_0_success", "%s - %s.\nFormat:%s"],
    ["cmd_return_help_0_failure", "Command %s not found, use ,help for a list of all commands."],
    ["cmd_return_help_1_success", "MCWL Commands: \n%s"],
    ["cmd_return_jump_0_info", "%s has jumped %d times"],
    ["cmd_return_firstjoined_0_info", "%s first joined this world on %s"],
    ["cmd_return_lastdied_0_info", "%s last died %d ticks ago"],
    ["cmd_return_playerjoined_0_info", "%s has joined this world %d times."],
    ["cmd_return_playtime_0_info", "%s has played for %d ticks."],
    ["cmd_return_raidstriggered_0_info", "%s has triggered %d raids."],
    ["cmd_return_savedb_0_info", "Database saved."],
    ["cmd_return_setblock_0_success", "%s placed at [%d, %d, %d]."],
    ["cmd_return_sleepinbed_0_info", "%s has slept %d times."],
    ["cmd_return_spawn_0_success", "Spawned %d %s at [%d, %d, %d]."],
    ["cmd_return_spawnplayer_0_success", "Spawned player with name _%s."],
    ["cmd_return_sudo_0_success", "%s has been nicked as %s for %s."],
    ["cmd_return_sudo_1_off_success", "Sudo module has been toggled off."],
    ["cmd_return_sudo_1_on_success", "Sudo module has been toggled on."],
    ["cmd_return_sudo_1_failure", "Unexpected '%s' at <on|off|toggle:string>."],
    ["cmd_return_timesincerest_0_info", "%s last slept %d ticks ago"],
    ["cmd_return_top_0_failure", "Unable to find teleport location."],
    ["cmd_return_top_0_success", "Teleported %s to ceiling."],
    ["cmd_args_levels", "levels"],
    ["cmd_args_padding", "padding"],
    ["cmd_args_target", "target"],
    ["cmd_args_statType", "statType"],
    ["cmd_args_blockName", "blockName"],
    ["cmd_args_blocksBroken", "blocksBroken"],
    ["cmd_args_blocksPlaced", "blocksPlaced"],
    ["cmd_args_depth", "depth"],
    ["cmd_args_command", "command"],
    ["cmd_args_position", "position"],
    ["cmd_args_start", "start"],
    ["cmd_args_end", "end"],
    ["cmd_args_distance", "distance"],
    ["cmd_args_block", "block"],
    ["cmd_args_entity", "entity"],
    ["cmd_args_count", "count"],
    ["cmd_args_name", "name"],
    ["cmd_args_sudoOptions", "on|off|toggle"],
    ["cmd_args_sudo_on", "on"],
    ["cmd_args_sudo_off", "off"],
    ["cmd_args_sudo_toggle", "toggle"]
]);
export const LOCALE_ZH_HANS = new Map([
    ["player_welcome", "欢迎 %s。 这伺服器使用《我的世界：剩下的细节》。 如果你有其他关于《我的世界：剩下的细节》的疑问，在电脑上输入 \“,help\”。"],
    ["cmd_not_found", "找不到这个指令。 用 \“,help\” 来找终端命令列表。"],
    ["cmd_return_default", "找不到这个指令。 用 \“,help %s\” 来找终端命令列表。"],
    ["cmd_name_ascend", "ascend"],
    ["cmd_name_blocksint", "blocksint"],
    ["cmd_name_blocksmodified", "blocksmodified"],
    ["cmd_name_crouchtime", "crouchtime"],
    ["cmd_name_descend", "descend"],
    ["cmd_name_distancemoved", "distancemoved"],
    ["cmd_name_firstjoined", "firstjoined"],
    ["cmd_name_floor", "floor"],
    ["cmd_name_goto", "goto"],
    ["cmd_name_help", "help"],
    ["cmd_name_playerjoined", "playerjoined"],
    ["cmd_name_playtime", "playtime"],
    ["cmd_name_savedb", "savedb"],
    ["cmd_name_setblock", "setblock"],
    ["cmd_name_spawn", "spawn"],
    ["cmd_name_sudo", "sudo"],
    ["cmd_name_top", "top"],
    ["cmd_description_ascend", "瞬移你到上楼。"],
    ["cmd_description_blocksint", "显示你和对象有互动多少次。"],
    ["cmd_description_blocksmodified", "显示你和对象有互动多少次。"],
    ["cmd_description_crouchtime", "显示你有蹲伏的时间。"],
    ["cmd_description_descend", "瞬移你到下楼。"],
    ["cmd_description_distancemoved", "显示你有走多少米。"],
    ["cmd_description_firstjoined", "显示你第一次加入这伺服器的时间和日期。"],
    ["cmd_description_floor", "瞬移你到地面。"],
    ["cmd_description_goto", "瞬移你到你看着的地方。"],
    ["cmd_description_help", "看来，竟然我也忘了我自己的指令。"],
    ["cmd_description_playerjoined", "显示你有多少次加入这伺服器。"],
    ["cmd_description_playtime", "显示你在这伺服器玩了多久。"],
    ["cmd_description_savedb", "保存你的数据。"],
    ["cmd_description_setblock", "用指定的块填充区域。"],
    ["cmd_description_spawn", "设置实体。"],
    ["cmd_description_sudo", "转换游戏中的名族。"],
    ["cmd_description_top", "瞬移你到天花板。"],
    ["cmd_return_ascend_0_failure", "找不到这个瞬移指令。"],
    ["cmd_return_ascend_0_success", "上 %d 楼。"],
    ["cmd_return_ascend_1_failure", "找不到这个瞬移指令。"],
    ["cmd_return_ascend_1_success", "上 %d 楼。"],
    ["cmd_return_ascend_2_failure", "找不到这个瞬移指令。"],
    ["cmd_return_ascend_2_success", "上一楼。"],
    ["cmd_return_blocksint_0_info", "网名: %s, [%s] : %d"],
    ["cmd_return_blocksmodified_0_broken_info", "%s 开采了 %d %s。"],
    ["cmd_return_blocksmodified_0_placed_info", "%s 开采了 %d %s。"],
    ["cmd_return_blocksmodified_0_failure", "这个物体名字 \“%s\” 无效。"],
    ["cmd_return_crouchtime_0_info", "%s 蹲伏了 %d 游戏时间单位。"],
    ["cmd_return_descend_0_failure", "找不到这个瞬移指令。"],
    ["cmd_return_descend_0_success", "下 %d 楼。"],
    ["cmd_return_descend_1_failure", "找不到这个瞬移指令。"],
    ["cmd_return_descend_1_success", "下 %d 楼。"],
    ["cmd_return_descend_2_failure", "找不到这个瞬移指令。"],
    ["cmd_return_descend_2_success", "下一楼。"],
    ["cmd_return_distancemoved_0_info", "%s 在这伺服器走了 %d 米。"],
    ["cmd_return_firstjoined_0_info", "%s 在 %s 第一次加入这伺服器。"],
    ["cmd_return_floor_0_failure", "找不到这个瞬移指令。"],
    ["cmd_return_floor_0_success", "瞬移 %s 到地面。"],
    ["cmd_return_goto_0_success", "%s 从 [%d, %d, %d] 瞬移到 [%d, %d, %d]。"],
    ["cmd_return_goto_0_failure", "看着的地方没有固体物体。"],
    ["cmd_return_help_0_success", "%s - %s.\n格式:%s"],
    ["cmd_return_help_0_failure", "找不到这个指令。 用 \“,help\” 来找终端命令列表。"],
    ["cmd_return_help_1_success", "终端命令列表:\n%s"],
    ["cmd_return_playerjoined_0_info", "%s 加入这伺服器 %d 次。"],
    ["cmd_return_playtime_0_info", "%s 在这伺服器玩了 %d 游戏时间单位。"],
    ["cmd_return_savedb_0_info", "数据库已保存。"],
    ["cmd_return_setblock_0_success", "%s 设置在 [%d, %d, %d]。"],
    ["cmd_return_spawn_0_success", "设置 %d %s 在 [%d, %d, %d]。"],
    ["cmd_return_sudo_0_success", "%s 游戏中的名族转换成 %s ，这个转换包括 %s。"],
    ["cmd_return_sudo_1_off_success", "转换游戏中的名到原本名字。"],
    ["cmd_return_sudo_1_on_success", "转换游戏中的名族到预设名字。"],
    ["cmd_return_sudo_1_failure", "误语 '%s' 在 <on|off|toggle:string>。"],
    ["cmd_return_top_0_failure", "找不到这个瞬移指令。"],
    ["cmd_return_top_0_success", "瞬移 %s 到天花板。"],
    ["cmd_args_levels", "levels"],
    ["cmd_args_padding", "padding"],
    ["cmd_args_target", "target"],
    ["cmd_args_statType", "statType"],
    ["cmd_args_blockName", "blockName"],
    ["cmd_args_blocksBroken", "blocksBroken"],
    ["cmd_args_blocksPlaced", "blocksPlaced"],
    ["cmd_args_command", "command"],
    ["cmd_args_position", "position"],
    ["cmd_args_block", "block"],
    ["cmd_args_distance", "distance"],
    ["cmd_args_start", "start"],
    ["cmd_args_end", "end"],
    ["cmd_args_entity", "entity"],
    ["cmd_args_count", "count"],
    ["cmd_args_name", "name"],
    ["cmd_args_sudoOptions", "on|off|toggle"],
    ["cmd_args_sudo_on", "on"],
    ["cmd_args_sudo_off", "off"],
    ["cmd_args_sudo_toggle", "toggle"]
]);
export class Locale {
    constructor(language, languageMap) {
        this.language = language;
        this.languageMap = languageMap;
    }
    get(s) {
        let ret = this.languageMap.get(s);
        return (ret == undefined ? s : ret);
    }
}
export const locale = new Locale("en_us", Locale_EN_GB);
