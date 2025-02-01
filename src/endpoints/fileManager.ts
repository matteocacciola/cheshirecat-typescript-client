import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";

export class FileManagerEndpoint extends AbstractEndpoint {
    protected prefix = '/file_manager';

    /**
     * This endpoint returns the settings of all plugin file managers. Plugin file managers are set to a system level,
     * so usable by all the agents in the system.
     *
     * @returns the settings of all plugin file managers
     *
     */
    async getFileManagersSettings(): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            this.systemId
        );
    }

    /**
     * This endpoint returns the settings of a specific plugin file manager. Plugin file managers are set to a system
     * level, so usable by all the agents in the system.
     *
     * @param fileManager the name of the plugin file manager
     *
     * @returns the settings of the specified plugin file manager
     */
    async getFileManagerSettings(fileManager: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            this.systemId
        );
    }

    /**
     * This endpoint updates the settings of a specific Plugin file manager. Plugin file managers are set to a system
     * level, so usable by all the agents in the system.
     *
     * @param fileManager the name of the plugin file manager
     * @param values the new settings for the plugin file manager
     *
     * @returns the updated settings of the specified plugin file manager
     */
    async putFileManagerSettings(fileManager: string, values: Record<string, any>): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            values,
            this.systemId
        );
    }
}