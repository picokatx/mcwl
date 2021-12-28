import { ColorCodes } from "../constants/ColorCodes.js";
import { Console } from "./Console.js";
import { getAttributes, getMethods } from "./stringifyObject.js";
export const filter = RegExp(/[^\w\d\s]/);
export const notifPrefix = `${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}DPM${ColorCodes.reset}${ColorCodes.grey}]`;
export class PrintStream {
    constructor(printable) {
        this.hasError = false;
        this.debugEnabled = true;
        this.outputStream = "";
        this.printable = printable;
    }
    setError() {
        this.hasError = true;
    }
    clearError() {
        this.hasError = false;
    }
    checkError() {
        return this.hasError;
    }
    setDebugEnabled(b) {
        this.debugEnabled = b;
    }
    flush() {
        if (this.outputStream != "") {
            this.printable.runCommand(Console.tellraw(this.outputStream));
            this.outputStream = "";
        }
    }
    print(s) {
        switch (typeof s) {
            case 'string':
                this.outputStream += this.cleanText(s);
                break;
            case 'number':
                this.outputStream += s + "";
                break;
            case 'boolean':
                this.outputStream += s + "";
                break;
            case 'object':
                this.outputStream += `${ColorCodes.grey}Object${ColorCodes.bold} ${s.constructor.name}${ColorCodes.reset}\\n`;
                this.outputStream += `  ${ColorCodes.grey}Functions:${ColorCodes.reset}\\n`;
                getMethods(s).forEach((key) => {
                    this.outputStream += `    ${key}()\\n`;
                });
                this.outputStream += `  ${ColorCodes.grey}Attributes:${ColorCodes.reset}\\n`;
                getAttributes(s).forEach((key) => {
                    this.outputStream += `    ${key}\\n`;
                });
                break;
            default:
                this.hasError = true;
                this.outputStream += "Invalid Char";
        }
    }
    success(s) {
        this.flush();
        this.printable.runCommand(Console.tellraw(`${notifPrefix} ${ColorCodes.blue}${s}${ColorCodes.reset}`));
    }
    info(s) {
        this.flush();
        this.printable.runCommand(Console.tellraw(`${notifPrefix} ${ColorCodes.grey}${s}${ColorCodes.reset}`));
    }
    failure(s) {
        this.flush();
        this.printable.runCommand(Console.tellraw(`${notifPrefix} ${ColorCodes.darkred}${s}${ColorCodes.reset}`));
    }
    globalRun(s) {
        this.printable.runCommand(Console.globalRunCmd(s));
    }
    run(s, player) {
        this.printable.runCommand(Console.runCmd(s, player));
    }
    println(s) {
        this.print(s);
        this.printable.runCommand(Console.tellraw(this.outputStream));
        this.outputStream = "";
    }
    chat(s, player, targets) {
        this.flush();
        for (let i of targets) {
            this.printable.runCommand(Console.chat(s, player, i.name));
        }
    }
    sudoChat(s, name, target) {
        this.flush();
        this.printable.runCommand(Console.sudoChat(s, name, target));
    }
    cleanText(s) {
        return s.replace(RegExp(/(?<!\\)\"/g), "\\\"");
    }
    debug(s) {
        this.flush();
        if (this.debugEnabled) {
            this.printable.runCommand(Console.tellraw(`[${ColorCodes.blue}DEBUG${ColorCodes.reset}] ${this.cleanText(s)}`));
        }
    }
}
