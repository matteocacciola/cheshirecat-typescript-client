import {AgentOutput} from "./models/dtos";

export interface Memory {
    episodic: Record<string, any>[];
    declarative: Record<string, any>[];
    procedural: Record<string, any>[];
}

export interface MemoryPoint {
    content: string;
    metadata: Record<string, any>;
}

export interface SettingInput {
    name: string;
    value: Record<string, any>;
    category?: string | null;
}

export interface Why {
    input?: string | null;
    intermediateSteps?: Record<string, any>[];
    memory: Memory;
    modelInteractions?: Record<string, any>[];
    agentOutput?: AgentOutput;
}