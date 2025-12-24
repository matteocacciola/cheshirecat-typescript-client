import {SerializedName} from "../../decorators";

export class TokenOutput {
    @SerializedName("access_token")
    accessToken: string;

    @SerializedName("token_type")
    tokenType?: string | null = "Bearer";
}

export class User {
    id: string;
    username: string;
    permissions: Record<string, string[]>;
}

export class AgentMatch {
    @SerializedName("agent_id")
    agentId: string;

    @SerializedName("agent_name")
    agentName: string;

    @SerializedName("agent_description")
    agentDescription?: string | null = null;

    user: User;
}

export class MeOutput {
    success: boolean;

    agents: AgentMatch[];

    @SerializedName("auto_selected")
    autoSelected: boolean;
}