let varStore = {};
class ExprContext {
    static parseFloat(x) {
        return parseFloat(x[0]);
    }
    static parseInt(x) {
        return parseInt(x[0]);
    }
    static parseJSON(x) {
        return JSON.parse(x[0]);
    }
    static log(x) {
        return Math.log(x[0]);
    }
    static log10(x) {
        return Math.log10(x[0]);
    }
    static log1p(x) {
        return Math.log1p(x[0]);
    }
    static log2(x) {
        return Math.log2(x[0]);
    }
    static max(x) {
        return Math.max(x[0]);
    }
    static min(x) {
        return Math.min(x[0]);
    }
    static random(x) {
        return Math.random();
    }
    static abs(x) {
        return Math.abs(x[0]);
    }
    static round(x) {
        return Math.round(x[0]);
    }
    static fround(x) {
        return Math.fround(x[0]);
    }
    static ceil(x) {
        return Math.ceil(x[0]);
    }
    static floor(x) {
        return Math.floor(x[0]);
    }
    static exp(x) {
        return Math.exp(x[0]);
    }
    static sin(x) {
        return Math.sin(x[0]);
    }
    static asin(x) {
        return Math.asin(x[0]);
    }
    static sinh(x) {
        return Math.sinh(x[0]);
    }
    static asinh(x) {
        return Math.asinh(x[0]);
    }
    static cos(x) {
        return Math.cos(x[0]);
    }
    static acos(x) {
        return Math.acos(x[0]);
    }
    static cosh(x) {
        return Math.cosh(x[0]);
    }
    static acosh(x) {
        return Math.acosh(x[0]);
    }
    static tan(x) {
        return Math.tan(x[0]);
    }
    static atan(x) {
        return Math.atan(x[0]);
    }
    static tanh(x) {
        return Math.tanh(x[0]);
    }
    static atanh(x) {
        return Math.atanh(x[0]);
    }
    static sqrt(x) {
        return Math.sqrt(x[0]);
    }
    static cbrt(x) {
        return Math.cbrt(x[0]);
    }
}
ExprContext.PI = Math.PI;
ExprContext.PHI = 1.61803398875;
ExprContext.E = Math.E;
ExprContext.RADIAN = Math.PI / 180;
const TOKEN_TYPE = {
    CONST_PI: RegExp(/^PI/),
    CONST_PHI: RegExp(/^PHI/),
    CONST_E: RegExp(/^E/),
    CONST_RAD: RegExp(/^RADIAN/),
    KEY_LET: RegExp(/^let/),
    KEY_VAR: RegExp(/^var/),
    KEY_CONST: RegExp(/^const/),
    LIT_FLOAT: RegExp(/^(?:-|)\d+\.\d+/),
    LIT_NUMBER: RegExp(/^(?:-|)\d+/),
    LIT_STRING: RegExp(/^"(?:[\w:@ ]+)"/),
    LIT_LIST: RegExp(/^\[(?:.*,)*(?:[^)]*)\]/),
    LIT_FUN: RegExp(/^(?=(?=\w)\D\w*)(?=\w)\D\w*\((?:.*,)*(?:[^)]*)\)/),
    LIT_QUERY: RegExp(/^\%(?=\w)\D\w+/),
    OP_ADD: RegExp(/^\+/),
    OP_SUB: RegExp(/^\-/),
    OP_MUL: RegExp(/^\*/),
    OP_DIV: RegExp(/^\//),
    OP_POW: RegExp(/^\*\*/),
    OP_EQUALS: RegExp(/^\=/),
    OP_CEQUALS: RegExp(/^\=\=/),
    OP_CNOTEQU: RegExp(/^\!\=/),
    OP_CMOREEQU: RegExp(/^\>\=/),
    OP_CLESSEQU: RegExp(/\<\=/),
    OP_CMORE: RegExp(/^\>/),
    OP_CLESS: RegExp(/^\</),
    OP_INCR: RegExp(/^\+\+/),
    OP_DECR: RegExp(/^\-\-/),
    SYN_COMMA: RegExp(/^\,/),
    SYN_BRACKET: RegExp(/^(?<!\w)\([^)]*\)/),
    SYN_POINT: RegExp(/^\./),
    SYN_SPACE: RegExp(/^ /),
    VAR: RegExp(/^(?=\w)\D\w+/),
};
let tokenBuffer = [];
class TokenMap {
    constructor(name, type, run) {
        this.name = name;
        this.type = type;
        if (run != undefined) {
            this.run = run;
        }
        else {
            this.run = function (token) {
                return token;
            };
        }
    }
}
const TOKEN_MAP = [
    new TokenMap("LIT_LIST", TOKEN_TYPE.LIT_LIST, function (token) { return ExprContext.parseJSON([token]); }),
    new TokenMap("LIT_FUN", TOKEN_TYPE.LIT_FUN),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.LIT_FLOAT, function (token) { return ExprContext.parseFloat([token]); }),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.LIT_NUMBER, function (token) { return ExprContext.parseInt([token]); }),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.CONST_PI, function () { return ExprContext.PI; }),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.CONST_PHI, function () { return ExprContext.PHI; }),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.CONST_E, function () { return ExprContext.E; }),
    new TokenMap("LIT_NUMBER", TOKEN_TYPE.CONST_RAD, function () { return ExprContext.RADIAN; }),
    new TokenMap("KEY_LET", TOKEN_TYPE.KEY_LET),
    new TokenMap("KEY_VAR", TOKEN_TYPE.KEY_VAR),
    new TokenMap("KEY_CONST", TOKEN_TYPE.KEY_CONST),
    new TokenMap("LIT_QUERY", TOKEN_TYPE.LIT_QUERY),
    new TokenMap("VAR", TOKEN_TYPE.VAR),
    new TokenMap("LIT_STRING", TOKEN_TYPE.LIT_STRING, function (token) { return token.slice(1, -1); }),
    new TokenMap("OP_EQUALS", TOKEN_TYPE.OP_EQUALS),
    new TokenMap("OP_CNOTEQU", TOKEN_TYPE.OP_CNOTEQU),
    new TokenMap("OP_CMOREEQU", TOKEN_TYPE.OP_CMOREEQU),
    new TokenMap("OP_CLESSEQU", TOKEN_TYPE.OP_CLESSEQU),
    new TokenMap("OP_INCR", TOKEN_TYPE.OP_INCR),
    new TokenMap("OP_DECR", TOKEN_TYPE.OP_DECR),
    new TokenMap("OP_POW", TOKEN_TYPE.OP_POW),
    new TokenMap("OP_MUL", TOKEN_TYPE.OP_MUL),
    new TokenMap("OP_DIV", TOKEN_TYPE.OP_DIV),
    new TokenMap("OP_ADD", TOKEN_TYPE.OP_ADD),
    new TokenMap("OP_SUB", TOKEN_TYPE.OP_SUB),
    new TokenMap("OP_EQUALS", TOKEN_TYPE.OP_EQUALS),
    new TokenMap("OP_CMORE", TOKEN_TYPE.OP_CMORE),
    new TokenMap("OP_CLESS", TOKEN_TYPE.OP_CLESS),
    new TokenMap("SYN_COMMA", TOKEN_TYPE.SYN_COMMA),
    new TokenMap("SYN_BRACKET", TOKEN_TYPE.SYN_BRACKET),
    new TokenMap("SYN_POINT", TOKEN_TYPE.SYN_POINT),
    new TokenMap("SYN_SPACE", TOKEN_TYPE.SYN_SPACE, function () { return 0; })
];
class TokenTypes {
}
class Token {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
class SubExpr {
    constructor(name, expr, run, weight) {
        this.name = name;
        this.expr = expr;
        this.run = run;
        this.weight = weight;
    }
}
class AddNode {
    constructor() {
        this.name = "add";
    }
    run() {
        return this.val[0].token + this.val[1].token;
    }
}
class SubtractNode {
    constructor() {
        this.name = "subtract";
    }
    run() {
        return this.val[0].token - this.val[1].token;
    }
}
class MultiplyNode {
    constructor() {
        this.name = "multiply";
    }
    run() {
        return this.val[0].token * this.val[1].token;
    }
}
class DivideNode {
    constructor() {
        this.name = "divide";
    }
    run() {
        return this.val[0].token / this.val[1].token;
    }
}
class PowerNode {
    constructor() {
        this.name = "power";
    }
    run() {
        return this.val[0].token ** this.val[1].token;
    }
}
class PreIncrementNode {
    constructor() {
        this.name = "preincrement";
    }
    run() {
        return ++this.val[0].token;
    }
}
class PostIncrementNode {
    constructor() {
        this.name = "postincrement";
    }
    run() {
        return this.val[0].token++;
    }
}
class PreDecrementNode {
    constructor() {
        this.name = "predecrement";
    }
    run() {
        return --this.val[0].token;
    }
}
class PostDecrementNode {
    constructor() {
        this.name = "postdecrement";
    }
    run() {
        return this.val[0].token--;
    }
}
class MoreThanNode {
    constructor() {
        this.name = "morethan";
    }
    run() {
        return this.val[0].token > this.val[1].token;
    }
}
class LessThanNode {
    constructor() {
        this.name = "lessthan";
    }
    run() {
        return this.val[0].token < this.val[1].token;
    }
}
class MoreThanEqualsNode {
    constructor() {
        this.name = "morethanequals";
    }
    run() {
        return this.val[0].token >= this.val[1].token;
    }
}
class LessThanEqualsNode {
    constructor() {
        this.name = "lessthanequals";
    }
    run() {
        return this.val[0].token <= this.val[1].token;
    }
}
class StrictEqualsNode {
    constructor() {
        this.name = "strictequals";
    }
    run() {
        return this.val[0].token === this.val[1].token;
    }
}
class StrictNotEqualsNode {
    constructor() {
        this.name = "strictnotequals";
    }
    run() {
        return this.val[0].token !== this.val[1].token;
    }
}
class AssignNode {
    constructor() {
        this.name = "assign";
    }
    run() {
        varStore[typeof this.val[0].token] = this.val[1].token;
    }
}
class DeclareNode {
    constructor() {
        this.name = "declare";
    }
    run() {
        varStore[typeof this.val[0].token] = undefined;
    }
}
class FunctionNode {
    constructor() {
        this.name = "function";
    }
    run() {
        return ExprContext[this.val[0].token](this.val[1].token);
    }
}
class BracketNode {
    constructor() {
        this.name = "bracket";
    }
    run() {
        return;
    }
}
const SUBEXPR_MAP = [
    new SubExpr("BRACKET", [
        ["SYN_BRACKET"],
    ], function (a, b) { }, 21),
    new SubExpr("RTN_FUNCTION", [
        ["LIT_FUNARGS"]
    ], function (a, args) { return ExprContext[a](args); }, 20),
    new SubExpr("POSTINCREMENT", [
        ["LIT_NUMBER", "OP_INCR"],
    ], function (a) { return a++; }, 19),
    new SubExpr("POSTDECREMENT", [
        ["LIT_NUMBER", "OP_DECR"],
    ], function (a) { return a--; }, 19),
    new SubExpr("PREINCREMENT", [
        ["OP_INCR", "LIT_NUMBER"]
    ], function (a) { return ++a; }, 19),
    new SubExpr("PREDECREMENT", [
        ["OP_DECR", "LIT_NUMBER"]
    ], function (a) { return --a; }, 19),
    new SubExpr("POWER", [
        ["LIT_NUMBER", "OP_POW", "LIT_NUMBER"]
    ], function (a, b) { return a ** b; }, 16),
    new SubExpr("MULTIPLY", [
        ["LIT_NUMBER", "OP_MUL", "LIT_NUMBER"]
    ], function (a, b) { return a * b; }, 15),
    new SubExpr("DIVIDE", [
        ["LIT_NUMBER", "OP_DIV", "LIT_NUMBER"]
    ], function (a, b) { return a / b; }, 15),
    new SubExpr("ADD", [
        ["LIT_NUMBER", "OP_ADD", "LIT_NUMBER"],
        ["LIT_STRING", "OP_ADD", "LIT_STRING"]
    ], function (a, b) { return a + b; }, 14),
    new SubExpr("SUBTRACT", [
        ["LIT_NUMBER", "OP_SUB", "LIT_NUMBER"]
    ], function (a, b) { return a - b; }, 14),
    new SubExpr("CMP_MORE", [
        ["LIT_NUMBER", "OP_CMORE", "LIT_NUMBER"],
        ["LIT_STRING", "OP_CMORE", "LIT_STRING"]
    ], function (a, b) { return a > b; }, 12),
    new SubExpr("CMP_LESS", [
        ["LIT_NUMBER", "OP_CLESS", "LIT_NUMBER"],
        ["LIT_STRING", "OP_CLESS", "LIT_STRING"]
    ], function (a, b) { return a < b; }, 12),
    new SubExpr("CMP_MOREEQUAL", [
        ["LIT_NUMBER", "OP_CMOREEQU", "LIT_NUMBER"],
        ["LIT_STRING", "OP_CMOREEQU", "LIT_STRING"]
    ], function (a, b) { return a >= b; }, 12),
    new SubExpr("CMP_LESSEQUAL", [
        ["LIT_NUMBER", "OP_CLESSEQU", "LIT_NUMBER"],
        ["LIT_STRING", "OP_CLESSEQU", "LIT_STRING"]
    ], function (a, b) { return a <= b; }, 12),
    new SubExpr("CMP_EQUAL", [
        ["LIT_NUMBER", "OP_EQUALS", "LIT_NUMBER"],
        ["LIT_STRING", "OP_EQUALS", "LIT_STRING"]
    ], function (a, b) { return a === b; }, 11),
    new SubExpr("CMP_NOTEQUAL", [
        ["LIT_NUMBER", "OP_CNOTEQU", "LIT_NUMBER"],
        ["LIT_STRING", "OP_CNOTEQU", "LIT_STRING"]
    ], function (a, b) { return a !== b; }, 11),
    new SubExpr("ASSIGN", [
        ["KEY_VAR", "VAR", "OP_EQUALS", "LIT_NUMBER"],
        ["KEY_VAR", "VAR", "OP_EQUALS", "LIT_STRING"],
        ["VAR", "OP_EQUALS", "LIT_NUMBER"],
        ["VAR", "OP_EQUALS", "LIT_STRING"]
    ], function (a, b) { varStore[typeof a] = b; }, 3),
    new SubExpr("DECLARE", [
        ["KEY_VAR", "VAR"]
    ], function (a) { varStore[typeof a] = undefined; }, 3),
];
export class QueriedVal {
}
export class Expression {
    static parse(expr) {
        let exprIterator = expr;
        let tokens = [new Token("LIT_NUMBER", 0), new Token("OP_ADD", "+")];
        while (exprIterator.length > 0) {
            for (let i of Object.values(TOKEN_MAP)) {
                if (i.type.test(exprIterator)) {
                    if ((i.name == "LIT_NUMBER" && tokens[tokens.length - 1].name == "LIT_NUMBER")) {
                        let UPtoken;
                        if (TOKEN_TYPE.OP_SUB.test(exprIterator)) {
                            UPtoken = TOKEN_TYPE.OP_SUB.exec(exprIterator)[0];
                            exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                            tokens.push(new Token("OP_SUB", UPtoken));
                        }
                        else {
                            UPtoken = TOKEN_TYPE.OP_ADD.exec(exprIterator)[0];
                            exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                            tokens.push(new Token("OP_ADD", UPtoken));
                        }
                    }
                    let UPtoken = i.type.exec(exprIterator)[0];
                    let token = i.run(UPtoken);
                    exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                    if (token != " ") {
                        tokens.push(new Token(i.name, token));
                    }
                    break;
                }
            }
        }
        return tokens;
    }
    static compute(tokens, ...args) {
        for (let i of SUBEXPR_MAP) {
            for (let j of i.expr) {
                let instances = tokens.map((token, idx) => { return tokens.slice(idx, idx + j.length).map((ele, idx) => { return ele.name === j[idx]; }).every(e => e == true); });
            }
        }
    }
}
