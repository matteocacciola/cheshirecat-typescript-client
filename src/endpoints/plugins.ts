import {AbstractEndpoint} from "./abstract";
import {PluginCollectionOutput, PluginsSettingsOutput, PluginToggleOutput} from "../models/api/plugins";
import {PluginSettingsOutput} from "../models/api/nested/plugins";

export class PluginsEndpoint extends AbstractEndpoint {
    protected prefix = "/plugins";

    /**
     * This endpoint returns the available plugins.
     *
     * @param agentId - The ID of the agent to get the available plugins for.
     * @param pluginName - The name of the plugin to filter the results by (optional).
     *
     * @returns The available plugins.
     */
    async getAvailablePlugins(agentId: string, pluginName?: string | null): Promise<PluginCollectionOutput> {
        const result = await this.get<PluginCollectionOutput>(
            this.prefix,
            agentId,
            null,
            pluginName ? {query: pluginName} : {},
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint toggles a plugin.
     *
     * @param pluginId - The ID of the plugin to toggle.
     * @param agentId - The ID of the agent to toggle the plugin for.
     *
     * @returns The plugin toggle output.
     */
    async putTogglePlugin(pluginId: string, agentId: string): Promise<PluginToggleOutput> {
        return this.put<PluginToggleOutput>(
            this.formatUrl(`/toggle/${pluginId}`),
            agentId,
        );
    }

    /**
     * This endpoint retrieves the plugins settings.
     *
     * @param agentId - The ID of the agent to get the plugins settings for.
     *
     * @returns The plugins settings.
     */
    async getPluginsSettings(agentId: string): Promise<PluginsSettingsOutput> {
        return this.get<PluginsSettingsOutput>(
            this.formatUrl("/settings"),
            agentId,
        );
    }

    /**
     * This endpoint retrieves the plugin settings.
     *
     * @param pluginId - The ID of the plugin to get the settings for.
     * @param agentId - The ID of the agent to get the plugin settings for.
     *
     * @returns The plugin settings.
     */
    async getPluginSettings(pluginId: string, agentId: string): Promise<PluginSettingsOutput> {
        const result = await this.get<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            agentId
        );
        return PluginSettingsOutput.convertScheme(result);
    }

    /**
     * This endpoint updates the plugin settings.
     *
     * @param pluginId - The ID of the plugin to update the settings for.
     * @param agentId - The ID of the agent to update the plugin settings for.
     * @param values - The values to update the plugin settings with.
     *
     * @returns The plugin settings.
     */
    async putPluginSettings(pluginId: string, agentId: string, values: any): Promise<PluginSettingsOutput> {
        const result = await this.put<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            agentId,
            values,
        );
        return PluginSettingsOutput.convertScheme(result);
    }

    /**
     * This endpoint resets the plugin settings.
     *
     * @param pluginId - The ID of the plugin to update the settings for.
     * @param agentId - The ID of the agent to update the plugin settings for.
     *
     * @returns The plugin settings.
     */
    async postResetPluginSettings(pluginId: string, agentId: string): Promise<PluginSettingsOutput> {
        const result = await this.post<PluginSettingsOutput>(
            this.formatUrl(`/settings/${pluginId}`),
            agentId,
        );
        return PluginSettingsOutput.convertScheme(result);
    }
}