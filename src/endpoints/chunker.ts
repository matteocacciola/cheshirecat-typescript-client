import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class ChunkerEndpoint extends AbstractEndpoint {
    protected prefix = "/chunking";

    /**
     * This endpoint returns the settings of all chunkers.
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of all the large language models
     */
    async getChunkersSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint returns the settings of a specific chunker.
     *
     * @param chunker The name of the chunker to get the settings of
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of the chunker
     */
    async getChunkerSettings(chunker: string, agentId: string): Promise<FactoryObjectSettingOutput> {
        const result = await this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${chunker}`),
            agentId
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }

    /**
     * This endpoint updates the settings of a specific chunker.
     *
     * @param chunker The name of the chunker to update the settings of
     * @param agentId The ID of the agent to update the settings of
     * @param values The new settings of the chunker
     *
     * @returns The updated settings of the chunker
     */
    async putLargeLanguageModelSettings(
        chunker: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${chunker}`),
            agentId,
            values,
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }
}