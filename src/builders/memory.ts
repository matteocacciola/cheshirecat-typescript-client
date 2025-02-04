import {Memory, MemoryPoint} from "../types";
import {BaseBuilder} from "./types";

export class MemoryBuilder implements BaseBuilder {
    private episodic: Record<string, any>[] = [];
    private declarative: Record<string, any>[] = [];
    private procedural: Record<string, any>[] = [];

    public static create(): MemoryBuilder {
        return new MemoryBuilder();
    }

    public setEpisodic(episodic?: Record<string, any>[] | null): MemoryBuilder {
        this.episodic = episodic ?? [];
        return this;
    }

    public setDeclarative(declarative?: Record<string, any>[] | null): MemoryBuilder {
        this.declarative = declarative ?? [];
        return this;
    }

    public setProcedural(procedural?: Record<string, any>[] | null): MemoryBuilder {
        this.procedural = procedural ?? [];
        return this;
    }

    public build(): Memory {
        return {
            episodic: this.episodic,
            declarative: this.declarative,
            procedural: this.procedural
        };
    }
}

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