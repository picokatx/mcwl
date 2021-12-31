export class MCWLCommandReturn {
    constructor(errorCode, returnMessage, ...messageArgs) {
        this.errorCode = errorCode;
        this.returnMessage = returnMessage;
        this.messageArgs = Array.from(messageArgs);
    }
}
