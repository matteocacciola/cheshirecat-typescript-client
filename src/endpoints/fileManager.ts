import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";

export class FileManagerEndpoint extends AbstractEndpoint {
    protected prefix = '/file_manager';

    /**
     * This endpoint returns the settings of all plugin file managers, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns the settings of all plugin file managers
     *
     */
    async getFileManagersSettings(agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This endpoint returns the settings of a specific plugin file manager, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param fileManager the name of the plugin file manager
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns the settings of the specified plugin file manager
     */
    async getFileManagerSettings(fileManager: string, agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            agentId
        );
    }

    /**
     * This endpoint updates the settings of a specific Plugin file manager, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param fileManager the name of the plugin file manager
     * @param values the new settings for the plugin file manager
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns the updated settings of the specified plugin file manager
     */
    async putFileManagerSettings(
        fileManager: string,
        values: Record<string, any>,
        agentId?: string | null
    ): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            values,
            agentId
        );
    }
}