export function getMethods(obj: any): any[] {
    let properties = new Set()
    let objProto: any = obj
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item))
    }
    let methods: any[] = [...properties.keys()].filter((item: string) => typeof obj[item] === 'function')
    return methods;
}

export function getAttributes(obj: any) {
    let properties = new Set()
    let objProto = obj
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item))
    }
    return [...properties.keys()].filter((item: string) => typeof obj[item] !== 'function')
}

export function getPrototype(obj: any) {
    let properties = new Set()
    let objProto = obj
    while ((objProto = Object.getPrototypeOf(objProto))) {
        Object.getOwnPropertyNames(objProto).map(item => properties.add(item))
    }
    return [...properties.keys()]
}