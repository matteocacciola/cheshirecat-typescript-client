import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";
import {FileManagerAttributes, FileManagerDeletedFiles} from "../models/api/fileManager";

export class FileManagerEndpoint extends AbstractEndpoint {
    protected prefix = '/file_manager';

    /**
     * This endpoint returns the settings of all plugin file managers.
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns the settings of all plugin file managers
     *
     */
    async getFileManagersSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint returns the settings of a specific plugin file manager.
     *
     * @param fileManager the name of the plugin file manager
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns the settings of the specified plugin file manager
     */
    async getFileManagerSettings(fileManager: string, agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            agentId,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint updates the settings of a specific Plugin file manager.
     *
     * @param fileManager the name of the plugin file manager
     * @param agentId The ID of the agent to get the settings of
     * @param values the new settings for the plugin file manager
     *
     * @returns the updated settings of the specified plugin file manager
     */
    async putFileManagerSettings(
        fileManager: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingsOutput> {
        const result = await this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            agentId,
            values,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    async getFileManagerAttributes(agentId: string): Promise<FileManagerAttributes> {
        return this.get<FileManagerAttributes>(
            this.formatUrl("/"),
            agentId,
        );
    }

    async getFile(agentId: string, fileName: string): Promise<ReadableStream> {
        const endpoint = this.formatUrl(`/files/${fileName}`);

        const response = await this.getHttpClient(agentId).get(
            endpoint,
            { responseType: "stream" }
        );
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
        }
        return response.data;
    }

    async deleteFile(agentId: string, fileName: string): Promise<FileManagerDeletedFiles> {
        return this.delete<FileManagerDeletedFiles>(
            this.formatUrl(`/files/${fileName}`),
            agentId,
        );
    }

    async deleteFiles(agentId: string): Promise<FileManagerDeletedFiles> {
        return this.delete<FileManagerDeletedFiles>(
            this.formatUrl("/files"),
            agentId,
        );
    }
}