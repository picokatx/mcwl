import { ColorCodes } from "../constants/ColorCodes.js";
import { CustomCharID } from "../constants/CustomCharID.js";
import { Console } from "./Console.js";
import { getAttributes, getMethods } from "./stringifyObject.js";
export const filter = RegExp(/[^\w\d\s]/);
export const notifPrefix = `${ColorCodes.grey}[${ColorCodes.darkgreen}${ColorCodes.bold}MCWL${ColorCodes.reset}${ColorCodes.grey}]`;
export class PrintStream {
    constructor(printable) {
        this.hasError = false;
        this.debugEnabled = true;
        this.outputStream = "";
        this.queued = [];
        this.printable = printable;
    }
    broadcast() {
        if (this.queued.length > 0) {
            try {
                this.printable.runCommand(this.queued[0]);
                this.queued.shift();
            }
            catch {
            }
        }
    }
    broadcastAll() {
        if (this.queued.length > 0) {
            try {
                for (let i of this.queued) {
                    this.printable.runCommand(i);
                    this.queued.shift();
                }
            }
            catch {
            }
        }
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
            this.queued.push(Console.tellraw(this.outputStream));
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
    success(s, args) {
        this.flush();
        if (args == null) {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.blue}${s}${ColorCodes.reset}`));
        }
        else {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.blue}${this.format(s, args)}${ColorCodes.reset}`));
        }
    }
    info(s, args) {
        this.flush();
        if (args == null) {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.grey}${s}${ColorCodes.reset}`));
        }
        else {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.grey}${this.format(s, args)}${ColorCodes.reset}`));
        }
    }
    failure(s, args) {
        this.flush();
        if (args == null) {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.darkred}${s}${ColorCodes.reset}`));
        }
        else {
            this.queued.push(Console.tellraw(`${notifPrefix} ${ColorCodes.darkred}${this.format(s, args)}${ColorCodes.reset}`));
        }
    }
    globalRun(s) {
        this.queued.push(Console.globalRunCmd(s));
    }
    run(s, player) {
        this.queued.push(Console.runCmd(s, player));
    }
    format(s, args) {
        let a = Array.from(args);
        try {
            let ret = s;
            for (let i of a) {
                if (typeof i == 'string') {
                    ret = ret.replace(new RegExp(/%s/), i);
                }
                else if (typeof i == 'number') {
                    ret = ret.replace(new RegExp(/%d/), "" + i);
                }
                else if (typeof i == 'boolean') {
                    ret = ret.replace(new RegExp(/%b/), "" + i);
                }
            }
            return ret;
        }
        catch {
            this.failure(`Arguments of length ${a.length} does not satisfy requirement`);
        }
    }
    println(s, ...args) {
        this.print(this.format(s, args));
        this.queued.push(Console.tellraw(this.outputStream));
        this.outputStream = "";
    }
    chat(s, player, targets) {
        this.flush();
        for (let i of targets) {
            this.queued.push(Console.chat(this.replaceWithEmotes(s), player, i.name));
        }
    }
    sudoChat(s, name, target) {
        this.flush();
        this.queued.push(Console.sudoChat(this.replaceWithEmotes(s), name, target));
    }
    cleanText(s) {
        return s.replace(RegExp(/(?<!\\)\"/g), "\\\"");
    }
    debug(s) {
        this.flush();
        if (this.debugEnabled) {
            this.queued.push(Console.tellraw(`[${ColorCodes.blue}DEBUG${ColorCodes.reset}] ${this.cleanText(s)}`));
        }
    }
    replaceWithEmotes(s) {
        let ret = s;
        for (let i of Object.entries(CustomCharID)) {
            ret = ret.replace(new RegExp(`:${i[0]}:`, 'g'), i[1].toString());
        }
        return ret;
    }
}
