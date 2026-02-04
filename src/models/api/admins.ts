import {PluginToggleOutput} from "./plugins";
import {SerializedName} from "../../decorators";

export interface AgentCreatedOutput {
    created: boolean;
}

export interface PluginDeleteOutput {
    deleted: string;
}

export interface PluginDetailsOutput {
    data: Record<string, any>;
}

export interface PluginInstallFromRegistryOutput extends PluginToggleOutput {
    url: string;
    info: string;
}

export interface PluginInstallOutput extends PluginToggleOutput {
    filename: string;
    contentType: string;
}

export interface ResetOutput {
    deletedSettings: boolean;
    deletedMemories: boolean;
    deletedPluginFolders: boolean;
}

export interface AgentClonedOutput {
    cloned: boolean;
}

export interface AgentUpdatedOutput {
    updated: boolean;
}

export class AgentOutput {
    @SerializedName("agent_id")
    agentId: string;

    metadata: Record<string, any>;
}