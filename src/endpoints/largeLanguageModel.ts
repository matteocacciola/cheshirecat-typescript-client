import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class LargeLanguageModelEndpoint extends AbstractEndpoint {
    protected prefix = "/llm";

    async getLargeLanguageModelsSettings(agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    async getLargeLanguageModelSettings(llm: string, agentId?: string): Promise<FactoryObjectSettingOutput> {
        return this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${llm}`),
            agentId
        );
    }

    async putLargeLanguageModelSettings(llm: string, values: Record<string, any>, agentId?: string): Promise<FactoryObjectSettingOutput> {
        return this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${llm}`),
            values,
            agentId
        );
    }
}