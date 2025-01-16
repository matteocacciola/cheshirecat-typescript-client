import {BaseBuilder} from "./types";
import {Memory, Why} from "../types";
import {AgentOutput} from "../models/dtos";

export class WhyBuilder implements BaseBuilder {
    private input?: string;
    private intermediateSteps?: Record<string, any>[] = [];
    private memory!: Memory;
    private modelInteractions?: Record<string, any>[] = [];
    private agentOutput?: AgentOutput;

    public static create(): WhyBuilder {
        return new WhyBuilder();
    }

    public setInput(input?: string): WhyBuilder {
        this.input = input;
        return this;
    }

    public setIntermediateSteps(intermediateSteps?: Record<string, any>[]): WhyBuilder {
        this.intermediateSteps = intermediateSteps ?? [];
        return this;
    }

    public setMemory(memory: Memory): WhyBuilder {
        this.memory = memory;
        return this;
    }

    public setModelInteractions(modelInteractions?: Record<string, any>[]): WhyBuilder {
        this.modelInteractions = modelInteractions ?? [];
        return this;
    }

    public setAgentOutput(agentOutput?: AgentOutput): WhyBuilder {
        this.agentOutput = agentOutput;
        return this;
    }

    public build(): Why {
        return {
            input: this.input,
            intermediateSteps: this.intermediateSteps,
            memory: this.memory,
            modelInteractions: this.modelInteractions,
            agentOutput: this.agentOutput
        };
    }
}