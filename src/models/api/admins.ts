import {PluginToggleOutput} from "./plugins";

export interface AdminOutput {
    username: string;
    permissions: Record<string, string[]>;
    id: string;
}

export interface CreatedOutput {
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

export interface ClonedOutput {
    cloned: boolean;
}