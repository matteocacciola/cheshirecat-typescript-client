import {BaseDTO} from "./base";
import {SerializedName} from "../decorators";

export class Memory extends BaseDTO {
    public declarative: Record<string, any>[] = [];
    public procedural: Record<string, any>[] = [];

    public toArray(): Record<string, any> {
        return this.toJSON();
    }
}

export class MemoryPoint extends BaseDTO {
    constructor(
        public content: string,
        public metadata: Record<string, any>
    ) {
        super();
    }

    public toArray(): Record<string, any> {
        return this.toJSON();
    }
}

export class MessageBase extends BaseDTO {
    public text: string;
    public image: string | null;

    constructor(text: string = "", image: string | null = null) {
        super();
        this.text = text;
        this.image = image;
    }

    public toArray(): Record<string, any> {
        const result: Record<string, any> = {
            text: this.text
        };

        if (this.image) {
            result.image = this.image;
        }

        return result;
    }
}

export class Message extends MessageBase {
    constructor(
        text: string,
        image?: string,
        public metadata?: Record<string, any>
    ) {
        super();
        this.text = text;
        this.image = image || null;
    }

    public toArray(): Record<string, any> {
        const result = super.toArray();

        if (this.metadata) {
            result["metadata"] = this.metadata;
        }

        return result;
    }
}

export class SettingInput extends BaseDTO {
    constructor(
        public name: string,
        public value: Record<string, any> = [],
        public category?: string
    ) {
        super();
    }

    public toArray(): Record<string, any> {
        return this.toJSON();
    }
}

export class Why extends BaseDTO {
    public input?: string;

    @SerializedName("intermediate_steps")
    public intermediateSteps: Record<string, any>[] = [];

    public memory: Memory;

    public toArray(): Record<string, any> {
        return {
            input: this.input,
            intermediate_steps: this.intermediateSteps,
            memory: this.memory.toArray(),
        };
    }
}

export class Permission {
    id: string;
    name: any;
}