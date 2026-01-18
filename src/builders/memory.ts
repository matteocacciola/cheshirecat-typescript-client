import {MemoryPoint} from "../types";
import {BaseBuilder} from "./types";

export class MemoryPointBuilder implements BaseBuilder {
    private content!: string;
    private metadata!: Record<string, any>;

    public static create(): MemoryPointBuilder {
        return new MemoryPointBuilder();
    }

    public setContent(content: string): MemoryPointBuilder {
        this.content = content;
        return this;
    }

    public setMetadata(metadata: Record<string, any>): MemoryPointBuilder {
        this.metadata = metadata;
        return this;
    }

    public build(): MemoryPoint {
        return {
            content: this.content,
            metadata: this.metadata
        };
    }
}