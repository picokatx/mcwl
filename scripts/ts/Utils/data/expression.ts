let varStore = {}
class ExprContext {
    static PI: number = Math.PI
    static PHI: number = 1.61803398875
    static E: number = Math.E
    static RADIAN: number = Math.PI / 180
    static parseFloat(x: any[]) {
        return parseFloat(x[0])
    }
    static parseInt(x: any[]) {
        return parseInt(x[0])
    }
    static parseJSON(x: any[]) {
        return JSON.parse(x[0])
    }
    static log(x: any[]) {
        return Math.log(x[0])
    }
    static log10(x: any[]) {
        return Math.log10(x[0])
    }
    static log1p(x: any[]) {
        return Math.log1p(x[0])
    }
    static log2(x: any[]) {
        return Math.log2(x[0])
    }
    static max(x: any[]) {
        return Math.max(x[0])
    }
    static min(x: any[]) {
        return Math.min(x[0])
    }
    static random(x: any[]) {
        return Math.random()
    }
    static abs(x: any[]) {
        return Math.abs(x[0])
    }
    static round(x: any[]) {
        return Math.round(x[0])
    }
    static fround(x: any[]) {
        return Math.fround(x[0])
    }
    static ceil(x: any[]) {
        return Math.ceil(x[0])
    }
    static floor(x: any[]) {
        return Math.floor(x[0])
    }
    static exp(x: any[]) {
        return Math.exp(x[0])
    }
    static sin(x: any[]) {
        return Math.sin(x[0])
    }
    static asin(x: any[]) {
        return Math.asin(x[0])
    }
    static sinh(x: any[]) {
        return Math.sinh(x[0])
    }
    static asinh(x: any[]) {
        return Math.asinh(x[0])
    }
    static cos(x: any[]) {
        return Math.cos(x[0])
    }
    static acos(x: any[]) {
        return Math.acos(x[0])
    }
    static cosh(x: any[]) {
        return Math.cosh(x[0])
    }
    static acosh(x: any[]) {
        return Math.acosh(x[0])
    }
    static tan(x: any[]) {
        return Math.tan(x[0])
    }
    static atan(x: any[]) {
        return Math.atan(x[0])
    }
    static tanh(x: any[]) {
        return Math.tanh(x[0])
    }
    static atanh(x: any[]) {
        return Math.atanh(x[0])
    }
    static sqrt(x: any[]) {
        return Math.sqrt(x[0])
    }
    static cbrt(x: any[]) {
        return Math.cbrt(x[0])
    }
} 
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
}
let tokenBuffer = []
class TokenMap {
    name: string
    type: RegExp
    run: (token?: string) => string;
    constructor(name: string, type: RegExp);
    constructor(name: string, type: RegExp, run: (token?: string) => any);
    constructor(name?: string, type?: RegExp, run?: (token?: string) => any) {
        this.name = name
        this.type = type
        if (run != undefined) {
            this.run = run
        } else {
            this.run = function (token: string): string {
                return token
            }
        }
    }
}
const TOKEN_MAP = [
    new TokenMap(
        "LIT_LIST",
        TOKEN_TYPE.LIT_LIST,
        function (token: string) { return ExprContext.parseJSON([token]) }
    ),
    new TokenMap(
        "LIT_FUN",
        TOKEN_TYPE.LIT_FUN
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.LIT_FLOAT,
        function (token: string) { return ExprContext.parseFloat([token]) }
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.LIT_NUMBER,
        function (token: string) { return ExprContext.parseInt([token]) }
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.CONST_PI,
        function () { return ExprContext.PI }
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.CONST_PHI,
        function () { return ExprContext.PHI }
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.CONST_E,
        function () { return ExprContext.E }
    ),
    new TokenMap(
        "LIT_NUMBER",
        TOKEN_TYPE.CONST_RAD,
        function () { return ExprContext.RADIAN }
    ),
    new TokenMap("KEY_LET", TOKEN_TYPE.KEY_LET),
    new TokenMap("KEY_VAR", TOKEN_TYPE.KEY_VAR),
    new TokenMap("KEY_CONST", TOKEN_TYPE.KEY_CONST),
    new TokenMap("LIT_QUERY", TOKEN_TYPE.LIT_QUERY),
    new TokenMap("VAR", TOKEN_TYPE.VAR),
    new TokenMap(
        "LIT_STRING",
        TOKEN_TYPE.LIT_STRING,
        function (token: string) { return token.slice(1, -1) }
    ),
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
    new TokenMap(
        "SYN_SPACE",
        TOKEN_TYPE.SYN_SPACE,
        function () { return 0 }
    )
]
class TokenTypes {

}
class Token {
    name: string
    token: any
    constructor(name: string, token: any) {
        this.name = name
        this.token = token
    }
}
class SubExpr {
    name: string
    expr: string[][]
    run: (...args: any) => any
    weight: number
    constructor(name: string, expr: string[][], run: (...args: any) => any, weight: number) {
        this.name = name
        this.expr = expr
        this.run = run
        this.weight = weight;
    }
}
interface ExprNode {
    name: string
    children: ExprNode[]
    val: Token[]
    run:(...args: any) => any
}
class AddNode implements ExprNode{
    name: string = "add"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token + this.val[1].token;
    }
}
class SubtractNode implements ExprNode{
    name: string = "subtract"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token - this.val[1].token;
    }
}
class MultiplyNode implements ExprNode{
    name: string = "multiply"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token * this.val[1].token;
    }
}
class DivideNode implements ExprNode{
    name: string = "divide"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token / this.val[1].token;
    }
}
class PowerNode implements ExprNode{
    name: string = "power"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token ** this.val[1].token;
    }
}
class PreIncrementNode implements ExprNode{
    name: string = "preincrement"
    children: ExprNode[]
    val: Token[]
    run() {
        return ++this.val[0].token;
    }
}
class PostIncrementNode implements ExprNode{
    name: string = "postincrement"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token++;
    }
}
class PreDecrementNode implements ExprNode{
    name: string = "predecrement"
    children: ExprNode[]
    val: Token[]
    run() {
        return --this.val[0].token;
    }
}
class PostDecrementNode implements ExprNode{
    name: string = "postdecrement"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token--;
    }
}
class MoreThanNode implements ExprNode{
    name: string = "morethan"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token > this.val[1].token;
    }
}
class LessThanNode implements ExprNode{
    name: string = "lessthan"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token < this.val[1].token;
    }
}
class MoreThanEqualsNode implements ExprNode{
    name: string = "morethanequals"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token >= this.val[1].token;
    }
}
class LessThanEqualsNode implements ExprNode{
    name: string = "lessthanequals"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token <= this.val[1].token;
    }
}
class StrictEqualsNode implements ExprNode{
    name: string = "strictequals"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token === this.val[1].token;
    }
}
class StrictNotEqualsNode implements ExprNode{
    name: string = "strictnotequals"
    children: ExprNode[]
    val: Token[]
    run() {
        return this.val[0].token !== this.val[1].token;
    }
}
class AssignNode implements ExprNode{
    name: string = "assign"
    children: ExprNode[]
    val: Token[]
    run() {
        (varStore as any)[typeof this.val[0].token] = this.val[1].token;
    }
}
class DeclareNode implements ExprNode{
    name: string = "declare"
    children: ExprNode[]
    val: Token[]
    run() {
        (varStore as any)[typeof this.val[0].token] = undefined;
    }
}
class FunctionNode implements ExprNode{
    name: string = "function"
    children: ExprNode[]
    val: Token[]
    run() {
        return (ExprContext as any)[this.val[0].token](this.val[1].token)
    }
}
class BracketNode implements ExprNode{
    name: string = "bracket"
    children: ExprNode[]
    val: Token[]
    run() {
        return 
    }
}
const SUBEXPR_MAP:SubExpr[] = [
    new SubExpr(
        "BRACKET",
        [
            ["SYN_BRACKET"],
        ],
        function (a, b) { },
        21
    ),
    new SubExpr(
        "RTN_FUNCTION",
        [
            ["LIT_FUNARGS"]
        ],
        function (a, args: any[]) { return (ExprContext as any)[a](args) },
        20
    ),
    new SubExpr(
        "POSTINCREMENT",
        [
            ["LIT_NUMBER", "OP_INCR"],
        ],
        function (a) { return a++ },
        19
    ),
    new SubExpr(
        "POSTDECREMENT",
        [
            ["LIT_NUMBER", "OP_DECR"],
        ],
        function (a) { return a-- },
        19
    ),
    new SubExpr(
        "PREINCREMENT",
        [
            [ "OP_INCR","LIT_NUMBER"]
        ],
        function (a) { return ++a },
        19
    ),
    new SubExpr(
        "PREDECREMENT",
        [
            [ "OP_DECR","LIT_NUMBER"]
        ],
        function (a) { return --a },
        19
    ),
    new SubExpr(
        "POWER",
        [
            ["LIT_NUMBER", "OP_POW", "LIT_NUMBER"]
        ],
        function (a, b) { return a ** b },
        16
    ),
    new SubExpr(
        "MULTIPLY",
        [
            ["LIT_NUMBER", "OP_MUL", "LIT_NUMBER"]
        ],
        function (a, b) { return a * b },
        15
    ),

    new SubExpr(
        "DIVIDE",
        [
            ["LIT_NUMBER", "OP_DIV", "LIT_NUMBER"]
        ],
        function (a, b) { return a / b },
        15
    ),
    new SubExpr(
        "ADD",
        [
            ["LIT_NUMBER", "OP_ADD", "LIT_NUMBER"],
            ["LIT_STRING", "OP_ADD", "LIT_STRING"]
        ],
        function (a, b) { return a + b },
        14
    ),
    new SubExpr(
        "SUBTRACT",
        [
            ["LIT_NUMBER", "OP_SUB", "LIT_NUMBER"]
        ],
        function (a, b) { return a - b },
        14
    ),
    new SubExpr(
        "CMP_MORE",
        [
            ["LIT_NUMBER", "OP_CMORE", "LIT_NUMBER"],
            ["LIT_STRING", "OP_CMORE", "LIT_STRING"]
        ],
        function (a, b) { return a > b },
        12
    ),
    new SubExpr(
        "CMP_LESS",
        [
            ["LIT_NUMBER", "OP_CLESS", "LIT_NUMBER"],
            ["LIT_STRING", "OP_CLESS", "LIT_STRING"]
        ],
        function (a, b) { return a < b },
        12
    ),
    new SubExpr(
        "CMP_MOREEQUAL",
        [
            ["LIT_NUMBER", "OP_CMOREEQU", "LIT_NUMBER"],
            ["LIT_STRING", "OP_CMOREEQU", "LIT_STRING"]
        ],
        function (a, b) { return a >= b },
        12
    ),
    new SubExpr(
        "CMP_LESSEQUAL",
        [
            ["LIT_NUMBER", "OP_CLESSEQU", "LIT_NUMBER"],
            ["LIT_STRING", "OP_CLESSEQU", "LIT_STRING"]
        ],
        function (a, b) { return a <= b },
        12
    ),
    new SubExpr(
        "CMP_EQUAL",
        [
            ["LIT_NUMBER", "OP_EQUALS", "LIT_NUMBER"],
            ["LIT_STRING", "OP_EQUALS", "LIT_STRING"]
        ],
        function (a, b) { return a === b },
        11
    ),
    new SubExpr(
        "CMP_NOTEQUAL",
        [
            ["LIT_NUMBER", "OP_CNOTEQU", "LIT_NUMBER"],
            ["LIT_STRING", "OP_CNOTEQU", "LIT_STRING"]
        ],
        function (a, b) { return a !== b },
        11
    ),
    new SubExpr(
        "ASSIGN",
        [
            ["KEY_VAR", "VAR", "OP_EQUALS", "LIT_NUMBER"],
            ["KEY_VAR", "VAR", "OP_EQUALS", "LIT_STRING"],
            ["VAR", "OP_EQUALS", "LIT_NUMBER"],
            ["VAR", "OP_EQUALS", "LIT_STRING"]
        ],
        function (a, b) { (varStore as any)[typeof a] = b },
        3
    ),
    new SubExpr(
        "DECLARE",
        [
            ["KEY_VAR", "VAR"]
        ],
        function (a) { (varStore as any)[typeof a] = undefined },
        3
    ),
]
export class QueriedVal {
    name: string
    val: any
}
export class Expression {
    static parse(expr: string) {
        let exprIterator: string = expr
        let tokens: Token[] = [new Token("LIT_NUMBER",0),new Token("OP_ADD","+")];
        while (exprIterator.length > 0) {
            for (let i of Object.values(TOKEN_MAP)) {
                if (i.type.test(exprIterator)) {
                    if ((i.name == "LIT_NUMBER" && tokens[tokens.length - 1].name == "LIT_NUMBER")) {
                        let UPtoken
                        if (TOKEN_TYPE.OP_SUB.test(exprIterator)) {
                            UPtoken = TOKEN_TYPE.OP_SUB.exec(exprIterator)[0]
                            exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                            tokens.push(new Token("OP_SUB", UPtoken))
                        } else {
                            UPtoken = TOKEN_TYPE.OP_ADD.exec(exprIterator)[0]
                            exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                            tokens.push(new Token("OP_ADD", UPtoken))
                        }
                    }
                    let UPtoken = i.type.exec(exprIterator)[0]
                    let token: any = i.run(UPtoken);
                    exprIterator = exprIterator.slice(UPtoken.length, exprIterator.length);
                    if (token != " ") {
                        tokens.push(new Token(i.name, token))
                    }
                    break;
                }
            }
        }
        return tokens;
    }
    static compute(tokens: Token[], ...args: QueriedVal[]) {
        for (let i of SUBEXPR_MAP) {
            for (let j of i.expr) {
                let instances = tokens.map((token,idx)=>{return tokens.slice(idx,idx+j.length).map((ele,idx)=>{return ele.name===j[idx]}).every(e=>e==true)});
            } 
        }
    }   
}