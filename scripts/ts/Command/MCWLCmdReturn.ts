export class MCWLCommandReturn {
    errorCode: number
    returnMessage: string
    messageArgs: any[]
    constructor(errorCode: number, returnMessage: string, ...messageArgs: any) {
        this.errorCode = errorCode;
        this.returnMessage = returnMessage;
        this.messageArgs = Array.from(messageArgs);
    }
}