export abstract class BaseDTO {
    protected static serializedNames: Map<string, string>;

    public toJSON(): Record<string, any> {
        const result: Record<string, any> = {};
        const serializedNames = (this.constructor as typeof BaseDTO).serializedNames || new Map();

        // Using Object.keys instead of Object.entries for broader compatibility
        const keys = Object.keys(this);

        for (const key of keys) {
            const value = (this as any)[key];
            const serializedName = serializedNames.get(key) || key;

            if (value instanceof BaseDTO) {
                result[serializedName] = value.toJSON();
            } else if (Array.isArray(value)) {
                result[serializedName] = value.map(item =>
                    item instanceof BaseDTO ? item.toJSON() : item
                );
            } else {
                result[serializedName] = value;
            }
        }

        return result;
    }
}