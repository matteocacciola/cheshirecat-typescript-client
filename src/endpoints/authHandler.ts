import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class AuthHandlerEndpoint extends AbstractEndpoint {
    protected prefix = "/auth_handler";

    /**
     * This endpoint returns the settings of all the authentication handlers. It is used to get the settings of all the
     * authentication handlers that are available in the agent specified by the agentId parameter.
     *
     * @param agentId The ID of the agent to get the authentication handlers settings from.
     *
     * @returns The settings of all the authentication handlers.
     */
    async getAuthHandlersSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint returns the settings of a specific authentication handler. It is used to get the settings of a
     * specific authentication handler that is available in the agent specified by the agentId parameter.
     *
     * @param authHandler The ID of the authentication handler to get the settings from.
     * @param agentId The ID of the agent to get the authentication handler settings from.
     *
     * @returns The settings of the specified authentication handler.
     */
    async getAuthHandlerSettings(
        authHandler: string,
        agentId: string
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            agentId
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }

    /**
     * This endpoint updates the settings of a specific authentication handler. It is used to update the settings of a
     * specific authentication handler that is available in the agent specified by the agentId parameter.
     *
     * @param authHandler The ID of the authentication handler to update the settings of.
     * @param agentId The ID of the agent to update the authentication handler settings in.
     * @param values The new values of the settings.
     *
     * @returns The updated settings of the specified authentication handler.
     */
    async putAuthHandlerSettings(
        authHandler: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            agentId,
            values,
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }
}