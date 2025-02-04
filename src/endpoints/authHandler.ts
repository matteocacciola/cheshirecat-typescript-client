import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class AuthHandlerEndpoint extends AbstractEndpoint {
    protected prefix = "/auth_handler";

    /**
     * This endpoint returns the settings of all the authentication handlers. It is used to get the settings of all the
     * authentication handlers that are available in the agent eventually specified by the agentId parameter.
     *
     * @param agentId The ID of the agent to get the authentication handlers settings from.
     *
     * @returns The settings of all the authentication handlers.
     */
    async getAuthHandlersSettings(agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This endpoint returns the settings of a specific authentication handler. It is used to get the settings of a
     * specific authentication handler that is available in the agent eventually specified by the agentId parameter.
     *
     * @param authHandler The ID of the authentication handler to get the settings from.
     * @param agentId The ID of the agent to get the authentication handler settings from.
     *
     * @returns The settings of the specified authentication handler.
     */
    async getAuthHandlerSettings(
        authHandler: string,
        agentId?: string | null
    ): Promise<FactoryObjectSettingOutput> {
        return this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            agentId
        );
    }

    /**
     * This endpoint updates the settings of a specific authentication handler. It is used to update the settings of a
     * specific authentication handler that is available in the agent eventually specified by the agentId parameter.
     *
     * @param authHandler The ID of the authentication handler to update the settings of.
     * @param values The new values of the settings.
     * @param agentId The ID of the agent to update the authentication handler settings in.
     *
     * @returns The updated settings of the specified authentication handler.
     */
    async putAuthHandlerSettings(
        authHandler: string,
        values: Record<string, any>,
        agentId?: string | null
    ): Promise<FactoryObjectSettingOutput> {
        return this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${authHandler}`),
            values,
            agentId
        );
    }
}