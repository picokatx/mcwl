import { Expression } from "../Utils/data/expression.js";
export const ARG_TYPE = {
    NUMBER: RegExp(/((?:-|)\d+)\s/),
    FLOAT: RegExp(/((?:-|)\d+\.\d+)\s/),
    STRING: RegExp(/("(?:[\w:@ ]+)"|(?:[\w:@]+))\s/),
    WORLD_POS: RegExp(/((?:~|)(?:(?:-|)\d+(?:\.\d+|)) (?:~|)(?:(?:-|)\d+(?:\.\d+|)) (?:~|)(?:(?:-|)\d+(?:\.\d+|)))\s/),
    RADIO: function (choices) { return RegExp('(' + choices.join("|") + ")\\s"); },
    LIST: RegExp(/(\[(?:.+)(?:,(?:.+))*\])\s/),
    JSON: RegExp(/(\{(?:.+)(?:,(?:.+))*\})\s/),
    EXPRESSION: RegExp(/(\<(?:.+)(?:,(?:.+))*\>)\s/)
};
export class ParameterType {
    constructor(name, type, test, parse) {
        this.name = name;
        this.regType = type;
        this.test = test;
        this.parse = parse;
    }
    test(para) {
        return true;
    }
    parse(para) {
        return "";
    }
}
export const ARG_NUMBER = new ParameterType("number", ARG_TYPE.NUMBER, function (para) {
    return this.type.test(para);
}, function (para) {
    return parseInt(para);
});
export const ARG_FLOAT = new ParameterType("float", ARG_TYPE.FLOAT, function (para) {
    return this.type.test(para);
}, function (para) {
    return parseFloat(para);
});
export const ARG_STRING = new ParameterType("string", ARG_TYPE.STRING, function (para) {
    return this.type.test(para);
}, function (para) {
    return para;
});
export const ARG_RADIO = function (args) {
    return new ParameterType("radio", ARG_TYPE.RADIO(args), function (para) {
        return this.type.test(para);
    }, function (para) {
        return para;
    });
};
export const ARG_WORLD_POS = new ParameterType("world_pos", ARG_TYPE.WORLD_POS, function (para) {
    return this.type.test(para);
}, function (para) {
    return RegExp(/(~|)((?:-|)\d+(?:\.\d+|)) (~|)((?:-|)\d+(?:\.\d+|)) (~|)((?:-|)\d+(?:\.\d+|))/).exec(para).slice(1);
});
export const ARG_LIST = new ParameterType("list", ARG_TYPE.LIST, function (para) {
    return this.type.test(para);
}, function (para) {
    return JSON.parse(para);
});
export const ARG_JSON = new ParameterType("json", ARG_TYPE.JSON, function (para) {
    return this.type.test(para);
}, function (para) {
    return JSON.parse(para);
});
export const ARG_EXPRESSION = new ParameterType("expr", ARG_TYPE.EXPRESSION, function (para) {
    return this.type.test(para);
}, function (para) {
    return Expression.parse(para);
});
export class CommandParameter {
    constructor(name, type, optional) {
        this.name = name;
        this.type = type;
        this.optional = optional;
    }
}
export class CommandFormat {
    constructor(para) {
        this.para = para;
    }
    testRegex(cmd) {
        return RegExp(this.para.map(a => a.type.regType.source)
            .join("")
            .slice(0, -2))
            .test(cmd);
    }
    parseRegex(cmd) {
        return RegExp(this.para.map(a => a.type.regType.source)
            .join("")
            .slice(0, -2))
            .exec(cmd)
            .slice(1);
    }
}
