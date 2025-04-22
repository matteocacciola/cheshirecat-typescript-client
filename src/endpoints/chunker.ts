import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class ChunkerEndpoint extends AbstractEndpoint {
    protected prefix = "/chunking";

    /**
     * This endpoint returns the settings of all chunkers, either for the agent identified by the agentId
     * parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of all the large language models
     */
    async getChunkersSettings(agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This endpoint returns the settings of a specific chunker, either for the agent identified by the
     * agentId parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param chunker The name of the chunker to get the settings of
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of the chunker
     */
    async getChunkerSettings(chunker: string, agentId?: string | null): Promise<FactoryObjectSettingOutput> {
        return this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${chunker}`),
            agentId
        );
    }

    /**
     * This endpoint updates the settings of a specific chunker, either for the agent identified by the
     * agentId parameter (for multi-agent installations) or for the default agent (for single-agent installations).
     *
     * @param chunker The name of the chunker to update the settings of
     * @param values The new settings of the chunker
     * @param agentId The ID of the agent to update the settings of
     *
     * @returns The updated settings of the chunker
     */
    async putLargeLanguageModelSettings(
        chunker: string,
        values: Record<string, any>,
        agentId?: string | null
    ): Promise<FactoryObjectSettingOutput> {
        return this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${chunker}`),
            values,
            agentId
        );
    }
}