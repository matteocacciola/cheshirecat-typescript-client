import {camelCaseKey} from "./helpers";

export class Serializer {
    private options: SerializerOptions;

    constructor(options: SerializerOptions) {
        this.options = options;
    }

    public serialize(data: any): string {
        const normalized = this.normalize(data);
        return JSON.stringify(normalized);
    }

    public deserialize<T>(json: string | object): T {
        const data = typeof(json) === "string" ? JSON.parse(json) : json;
        return this.denormalize<T>(data);
    }

    private normalize(data: any): any {
        if (Array.isArray(data)) {
            return data.map(item => this.normalize(item));
        }

        if (data && typeof data === "object") {
            const normalized: Record<string, any> = {};
            for (const [key, value] of Object.entries(data)) {
                const normalizedKey = this.options.nameConverter(key);
                normalized[normalizedKey] = this.normalize(value);
            }
            return normalized;
        }

        return data;
    }

    private denormalize<T>(data: any): T {
        const result: any = {};
        for (const [key, value] of Object.entries(data)) {
            const camelKey = camelCaseKey(key);
            result[camelKey] = value;
        }
        return result as T;
    }
}

interface SerializerOptions {
    nameConverter: (name: string) => string;
    enableCircularCheck: boolean;
}