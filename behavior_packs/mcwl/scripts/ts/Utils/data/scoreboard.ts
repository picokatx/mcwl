import { Player, CommandReturn } from "mojang-minecraft";
import { printStream } from "../../Main.js";

export class Scoreboard {
    static hasObjective(player: Player, objectiveName: string): boolean {
        try {
            let ret: CommandReturn = player.runCommand("scoreboard players list @s");
            printStream.println(ret.statusCode + "");
            let obj: string[] = ret.statusMessage.split('\n')
            for (let i = 1; i < obj.length; i++) {
                let temp: string[] = RegExp(/- (.+): (\d+) \((.+)\)/).exec(obj[i]);
                if (objectiveName == temp[1]) {
                    return true;
                }
            }
            return false;
        } catch (err) {
            printStream.debug("Player has no objectives");
            return false;
        }
    }
}