import { world } from "mojang-minecraft";
export class Console {
    static write(msg) {
        world.getDimension("overworld").runCommand("say " + this.cleanText(msg));
    }
    static debug(msg) {
        if (this.debugEnabled) {
            world.getDimension("overworld").runCommand("say " + this.cleanText(msg));
        }
    }
    static cleanText(msg) {
        let filter = RegExp(/[^\w\d\s]/);
        return msg.replace(filter, "");
    }
}
Console.debugEnabled = true;
