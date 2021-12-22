export function getMethods(obj) {
    let properties = new Set();
    let objProto = obj;
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item));
    }
    let methods = [...properties.keys()].filter((item) => typeof obj[item] === 'function');
    return methods;
}
export function getAttributes(obj) {
    let properties = new Set();
    let objProto = obj;
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item));
    }
    return [...properties.keys()].filter((item) => typeof obj[item] !== 'function');
}
export function getPrototype(obj) {
    let properties = new Set();
    let objProto = obj;
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item));
    }
    return [...properties.keys()];
}
