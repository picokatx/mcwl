export class PlayerData {
    constructor(data, dataType, name) {
        this.dataType = dataType;
        this.name = name;
        this.format = "v1.0";
        switch (dataType) {
            case "string":
                this.data = data;
                break;
            case "number":
                this.data = data;
                break;
            case "boolean":
                this.data = data;
                break;
            case "object":
                this.data = data;
                break;
            default:
        }
    }
    toJSON() {
        if (this.dataType == "object") {
            return Object.assign({}, this, {
                data: JSON.stringify(this.data)
            });
        }
        else {
            return Object.assign({}, this, {
                data: this.data.toString()
            });
        }
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            return JSON.parse(json, PlayerData.reviver);
        }
        else {
            let user = Object.create(PlayerData.prototype);
            if (json.dataType == "object") {
                return Object.assign(user, json, {
                    data: JSON.parse(json.data)
                });
            }
            else {
                return Object.assign(user, json, {
                    data: json.data.toString()
                });
            }
        }
    }
    static reviver(key, value) {
        return key === "" ? PlayerData.fromJSON(value) : value;
    }
}
