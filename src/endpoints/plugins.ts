import {AbstractEndpoint} from "./abstract";
import {PluginCollectionOutput, PluginsSettingsOutput, PluginToggleOutput} from "../models/api/plugins";
import {PluginSettingsOutput} from "../models/api/nested/plugins";

export class PluginsEndpoint extends AbstractEndpoint {
    protected prefix = "/plugins";

    /**
     * This endpoint returns the available plugins, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param pluginName - The name of the plugin to filter the results by (optional).
     * @param agentId - The ID of the agent to get the available plugins for.
     *
     * @returns The available plugins.
     */
    async getAvailablePlugins(pluginName?: string | null, agentId?: string | null): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.prefix,
            agentId,
            null,
            pluginName ? {query: pluginName} : {}
        );
    }

    /**
     * This endpoint toggles a plugin, either for the agent identified by the agentId parameter (for multi-agent
     * installations) or for the default agent (for single-agent installations).
     *
     * @param pluginId - The ID of the plugin to toggle.
     * @param agentId - The ID of the agent to toggle the plugin for.
     *
     * @returns The plugin toggle output.
     */
    async putTogglePlugin(pluginId: string, agentId?: string | null): Promise<PluginToggleOutput> {
        return this.put<PluginToggleOutput>(
            this.formatUrl(`/toggle/${pluginId}`),
            {},
            agentId
        );
    }

    /**
     * This endpoint retrieves the plugins settings, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param agentId - The ID of the agent to get the plugins settings for.
     *
     * @returns The plugins settings.
     */
    async getPluginsSettings(agentId?: string | null): Promise<PluginsSettingsOutput> {
        return this.get<PluginsSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This endpoint retrieves the plugin settings, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param pluginId - The ID of the plugin to get the settings for.
     * @param agentId - The ID of the agent to get the plugin settings for.
     *
     * @returns The plugin settings.
     */
    async getPluginSettings(pluginId: string, agentId?: string | null): Promise<PluginSettingsOutput> {
        return this.get<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            agentId
        );
    }

    /**
     * This endpoint updates the plugin settings, either for the agent identified by the agentId parameter
     * (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param pluginId - The ID of the plugin to update the settings for.
     * @param values - The values to update the plugin settings with.
     * @param agentId - The ID of the agent to update the plugin settings for.
     *
     * @returns The plugin settings.
     */
    async putPluginSettings(pluginId: string, values: any, agentId?: string | null): Promise<PluginSettingsOutput> {
        return this.put<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            values,
            agentId
        );
    }
}