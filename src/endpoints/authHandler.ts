import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class AuthHandlerEndpoint extends AbstractEndpoint {
    protected prefix = "/auth_handler";

    async getAuthHandlersSettings(agentId?: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    async getAuthHandlerSettings(
        authHandler: string,
        agentId?: string
    ): Promise<FactoryObjectSettingOutput> {
        return this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            agentId
        );
    }

    async putAuthHandlerSettings(
        authHandler: string,
        values: Record<string, any>,
        agentId?: string
    ): Promise<FactoryObjectSettingOutput> {
        return this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            values,
            agentId
        );
    }
}