import { Expression } from "../Utils/data/expression.js";
export const ARG_TYPE = {
    NUMBER: RegExp(/((?:-|)\d+)\s/),
    FLOAT: RegExp(/((?:-|)\d+\.\d+)\s/),
    STRING: RegExp(/("(?:[\w:@ ]+)"|(?:[\w:@]+))\s/),
    WORLD_POS: RegExp(/((?:~|)(?:(?:-|)\d+(?:\.\d+|)) (?:~|)(?:(?:-|)\d+(?:\.\d+|)) (?:~|)(?:(?:-|)\d+(?:\.\d+|)))\s/),
    RADIO: function (choices: String[]): RegExp { return RegExp('(' + choices.join("|") + ")\\s") },
    LIST: RegExp(/(\[(?:.+)(?:,(?:.+))*\])\s/),
    JSON: RegExp(/(\{(?:.+)(?:,(?:.+))*\})\s/),
    EXPRESSION: RegExp(/(\<(?:.+)(?:,(?:.+))*\>)\s/)
}
export class ParameterType {
    name: string;
    regType: RegExp;
    constructor(name: string, type: any, test: (para: string) => boolean, parse: (para: string) => any) {
        this.name = name;
        this.regType = type;
        this.test = test;
        this.parse = parse;
    }
    test(para: string): boolean {
        return true;
    }
    parse(para: string): any {
        return "";
    }
}

export const ARG_NUMBER: ParameterType = new ParameterType(
    "number",
    ARG_TYPE.NUMBER,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return parseInt(para);
    }
);
export const ARG_FLOAT: ParameterType = new ParameterType(
    "float",
    ARG_TYPE.FLOAT,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return parseFloat(para);
    }
);
export const ARG_STRING: ParameterType = new ParameterType(
    "string",
    ARG_TYPE.STRING,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return para;
    }
);
export const ARG_RADIO: (args: any[]) => ParameterType = function (args: any[]): ParameterType {
    return new ParameterType(
        "radio",
        ARG_TYPE.RADIO(args),
        function (para: string): boolean {
            return this.type.test(para);
        },
        function (para: string): any {
            return para;
        }
    )
};
export const ARG_WORLD_POS: ParameterType = new ParameterType(
    "world_pos",
    ARG_TYPE.WORLD_POS,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return RegExp(/(~|)((?:-|)\d+(?:\.\d+|)) (~|)((?:-|)\d+(?:\.\d+|)) (~|)((?:-|)\d+(?:\.\d+|))/).exec(para).slice(1);
    }
);
export const ARG_LIST: ParameterType = new ParameterType(
    "list",
    ARG_TYPE.LIST,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return JSON.parse(para);
    }
);
export const ARG_JSON: ParameterType = new ParameterType(
    "json",
    ARG_TYPE.JSON,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return JSON.parse(para);
    }
);
export const ARG_EXPRESSION: ParameterType = new ParameterType(
    "expr",
    ARG_TYPE.EXPRESSION,
    function (para: string): boolean {
        return this.type.test(para);
    },
    function (para: string): any {
        return Expression.parse(para);
    }
);

export class CommandParameter {
    name: string;
    type: ParameterType;
    optional: boolean;
    constructor(
        name: string,
        type: ParameterType,
        optional: boolean) {
        this.name = name;
        this.type = type;
        this.optional = optional;
    }
}
export class CommandFormat {
    para: CommandParameter[];
    constructor(para: CommandParameter[]) {
        this.para = para;
    }
    testRegex(cmd: string) {
        return RegExp(this.para.map(a => a.type.regType.source)
            .join("")
            .slice(0, -2))
            .test(cmd);
    }
    parseRegex(cmd: string) {
        return RegExp(this.para.map(a => a.type.regType.source)
            .join("")
            .slice(0, -2))
            .exec(cmd)
            .slice(1);
    }
}