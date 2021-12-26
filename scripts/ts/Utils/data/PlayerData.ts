import { printStream } from "../../Main.js";

export class PlayerData {
    data: any
    dataType: string
    name: string
    constructor(data: any, dataType: string,name:string) {
        this.dataType = dataType;
        this.name = name;
        switch (dataType) {
            case "string":
                this.data = (data as string)
                break;
            case "number":
                this.data = (data as number)
                break;
            case "boolean":
                this.data = (data as boolean)
                break;
            case "object":
                this.data = (data as object)
                break;
            default:
        }
    }
    toJSON(): PlayerJSONData {
        if (this.dataType == "object") {
            return Object.assign({}, this, {
                data: JSON.stringify(this.data)
            });
        } else {
            return Object.assign({}, this, {
                data: this.data.toString()
            });
        }
    }
    static fromJSON(json: PlayerJSONData | string): PlayerData {
        if (typeof json === 'string') {
            return JSON.parse(json, PlayerData.reviver);
        } else {
            let user = Object.create(PlayerData.prototype);
            if (json.dataType == "object") {
                return Object.assign(user, json, {
                    data: JSON.parse(json.data)
                });
            } else {
                return Object.assign(user, json, {
                    data: json.data.toString()
                });
            }
        }
    }
    static reviver(key: string, value: any): any {
        return key === "" ? PlayerData.fromJSON(value) : value;
    }
}
interface PlayerJSONData {
    data: any;
    dataType: string;
    name: string
}