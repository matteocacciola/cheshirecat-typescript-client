export function SerializedName(name: string) {
    return function (target: any, propertyKey: string) {
        const serializedNames = target.constructor.serializedNames || new Map();
        serializedNames.set(propertyKey, name);
        target.constructor.serializedNames = serializedNames;
    };
}