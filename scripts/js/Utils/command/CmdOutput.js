import { printStream } from "../../Main.js";
import { ColorCodes } from "../logging/ColorCodes.js";
import { Console } from "../logging/Console.js";
export function cmdSuccess(msg) {
    printStream.println(Console.tellraw(`${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}DPM${ColorCodes.reset}${ColorCodes.grey}] ${ColorCodes.blue}${msg}${ColorCodes.reset}`));
}
export function cmdInfo(msg) {
    printStream.println(Console.tellraw(`${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}DPM${ColorCodes.reset}${ColorCodes.grey}] ${ColorCodes.grey}${msg}${ColorCodes.reset}`));
}
export function cmdFailure(msg) {
    printStream.println(Console.tellraw(`${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}DPM${ColorCodes.reset}${ColorCodes.grey}] ${ColorCodes.darkred}${msg}${ColorCodes.reset}`));
}
