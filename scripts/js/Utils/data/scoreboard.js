import { printStream } from "../../Main.js";
export class Scoreboard {
    static hasObjective(player, objectiveName) {
        try {
            let ret = player.runCommand("scoreboard players list @s");
            printStream.println(ret.statusCode + "");
            let obj = ret.statusMessage.split('\n');
            for (let i = 1; i < obj.length; i++) {
                let temp = RegExp(/- (.+): (\d+) \((.+)\)/).exec(obj[i]);
                if (objectiveName == temp[1]) {
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            printStream.debug("Player has no objectives");
            return false;
        }
    }
}
