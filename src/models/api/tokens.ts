export class TokenOutput {
    accessToken: string;
    tokenType?: string | null = "Bearer";
}

export class User {
    id: string;
    username: string;
    permissions: Record<string, string[]>;
}

export class AgentMatch {
    agentId: string;
    agentName: string;
    agentDescription?: string | null = null;
    user: User;
}

export class MeOutput {
    success: boolean;
    agents: AgentMatch[];
    autoSelected: boolean;
}