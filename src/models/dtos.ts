import {BaseDTO} from "./base";
import {SerializedName} from "../decorators";

export class AgentOutput extends BaseDTO {
    public output?: string | null = null;

    @SerializedName("intermediate_steps")
    public intermediateSteps: Record<string, any>[] = [];

    @SerializedName("return_direct")
    public returnDirect: boolean = false;

    @SerializedName("with_llm_error")
    public withLlmError: boolean = false;

    public toArray(): Record<string, any> {
        return this.toJSON();
    }
}

export class Memory extends BaseDTO {
    public episodic: Record<string, any>[] = [];
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
        public additionalFields?: Record<string, any>
    ) {
        super();
        this.text = text;
        this.image = image || null;
    }

    public toArray(): Record<string, any> {
        const result = super.toArray();

        if (this.additionalFields) {
            return { ...result, ...this.additionalFields };
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

    @SerializedName("model_interactions")
    public modelInteractions: Record<string, any>[] = [];

    public toArray(): Record<string, any> {
        return {
            input: this.input,
            intermediate_steps: this.intermediateSteps,
            memory: this.memory.toArray(),
            model_interactions: this.modelInteractions,
        };
    }
}

export class Permission {
    id: string;
    name: any;
}