import { CommandFormat, CommandParameter, ARG_STRING } from "../CommandParameter.js";
import { Command } from "../Command.js";
import { commands, printStream } from "../../Main.js";
function help(player, args, subCmd) {
    switch (subCmd) {
        case 0:
            for (let i of commands) {
                if (i.name == args.get("command")) {
                    let format = "";
                    for (let j of i.cmdParameters) {
                        format += `\n,${i.name}`;
                        for (let k of j.para) {
                            if (k.optional) {
                                format += ` <${k.name}?:${k.type.name}>`;
                            }
                            else {
                                format += ` <${k.name}:${k.type.name}>`;
                            }
                        }
                    }
                    return [`${i.name} - ${i.description}.\nFormat:${format}`, 0];
                }
            }
            return [`Command not found, use ,help for a list of all commands`, 1];
        case 1:
            let helpText = "";
            for (let i of commands) {
                helpText += `${i.name} - ${i.description}\n`;
            }
            return [`List of all avaliable commands:\n${helpText}`, 0];
        default:
            return [`subCmd index ${subCmd} out of range. subCmd does not exist`, 1];
    }
}
function helpSucceed(suc) {
    printStream.success(suc);
}
function helpFail(err) {
    printStream.failure(err);
}
function helpInfo(inf) {
    printStream.info(inf);
}
const helpCmd = new Command("help", "pov you forgot your own command syntax smh", [
    new CommandFormat([
        new CommandParameter("command", ARG_STRING, false)
    ]),
    new CommandFormat([])
], help, helpSucceed, helpFail, helpInfo, 3);
export { helpCmd };
