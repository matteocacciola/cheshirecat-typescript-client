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
    memory?: Record<string, any>[];
}

export type Role = "user" | "assistant";