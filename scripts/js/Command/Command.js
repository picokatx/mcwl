export class Command {
    constructor(name, description, cmdParameters, execute, success, failure, info, opLevel) {
        this.name = name;
        this.description = description;
        this.cmdParameters = cmdParameters;
        this.execute = execute;
        this.success = success;
        this.failure = failure;
        this.info = info;
        this.opLevel = opLevel;
    }
}
