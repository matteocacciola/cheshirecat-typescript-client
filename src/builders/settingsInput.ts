import {SettingInput} from "../types";
import {BaseBuilder} from "./types";

export class SettingInputBuilder implements BaseBuilder {
    private name!: string;
    private value!: Record<string, any>;
    private category?: string | null;

    public static create(): SettingInputBuilder {
        return new SettingInputBuilder();
    }

    public setName(name: string): SettingInputBuilder {
        this.name = name;
        return this;
    }

    public setValue(value: Record<string, any>): SettingInputBuilder {
        this.value = value;
        return this;
    }

    public setCategory(category: string): SettingInputBuilder {
        this.category = category;
        return this;
    }

    public build(): SettingInput {
        return {
            name: this.name,
            value: this.value,
            category: this.category
        };
    }
}