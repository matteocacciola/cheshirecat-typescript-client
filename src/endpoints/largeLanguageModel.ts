import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class LargeLanguageModelEndpoint extends AbstractEndpoint {
    protected prefix = "/llm";

    /**
     * This endpoint returns the settings of all large language models.
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of all the large language models
     */
    async getLargeLanguageModelsSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint returns the settings of a specific large language model.
     *
     * @param llm The name of the large language model to get the settings of
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of the large language model
     */
    async getLargeLanguageModelSettings(llm: string, agentId: string): Promise<FactoryObjectSettingOutput> {
        const result = await this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${llm}`),
            agentId
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }

    /**
     * This endpoint updates the settings of a specific large language model.
     *
     * @param llm The name of the large language model to update the settings of
     * @param agentId The ID of the agent to update the settings of
     * @param values The new settings of the large language model
     *
     * @returns The updated settings of the large language model
     */
    async putLargeLanguageModelSettings(
        llm: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${llm}`),
            agentId,
            values,
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }
}