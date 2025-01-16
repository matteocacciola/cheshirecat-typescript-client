import {AbstractEndpoint} from "./abstract";
import {PluginCollectionOutput, PluginsSettingsOutput, PluginToggleOutput} from "../models/api/plugins";
import {PluginSettingsOutput} from "../models/api/nested/plugins";

export class PluginsEndpoint extends AbstractEndpoint {
    protected prefix = "/plugins";

    async getAvailablePlugins(pluginName?: string, agentId?: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.prefix,
            agentId,
            null,
            pluginName ? {query: pluginName} : {}
        );
    }

    async putTogglePlugin(pluginId: string, agentId?: string): Promise<PluginToggleOutput> {
        return this.put<PluginToggleOutput>(
            this.formatUrl(`/toggle/${pluginId}`),
            {},
            agentId
        );
    }

    async getPluginsSettings(agentId?: string): Promise<PluginsSettingsOutput> {
        return this.get<PluginsSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    async getPluginSettings(pluginId: string, agentId?: string): Promise<PluginSettingsOutput> {
        return this.get<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            agentId
        );
    }

    async putPluginSettings(pluginId: string, values: any, agentId?: string): Promise<PluginSettingsOutput> {
        return this.put<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            values,
            agentId
        );
    }
}