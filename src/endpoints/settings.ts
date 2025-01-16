import {FactoryObjectSettingsOutput} from "../models/api/factories";
import { AbstractEndpoint } from "./abstract";

export class SettingsEndpoint extends AbstractEndpoint {
    protected prefix = "/settings";

    async getSettings(agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    async getSetting(setting: string, agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId
        );
    }

    async putSetting(setting: string, values: Record<string, any>, agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            values,
            agentId
        );
    }

    async deleteSetting(setting: string, agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.delete<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId
        );
    }
}