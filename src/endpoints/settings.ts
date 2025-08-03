import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";
import {SettingInput} from "../models/dtos";
import {SettingOutputItem} from "../models/api/settings";

export class SettingsEndpoint extends AbstractEndpoint {
    protected prefix = "/settings";

    /**
     * This endpoint returns the settings of the agent identified by the agentId parameter.
     *
     * @param agentId The agent ID
     *
     * @returns The settings of the agent
     */
    async getSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This method creates a new setting for the agent identified by the agentId parameter.
     *
     * @param agentId The agent ID
     * @param values The values of the setting
     *
     * @returns The created setting
     */
    async postSetting(agentId: string, values: SettingInput): Promise<SettingOutputItem> {
        return this.post<SettingOutputItem>(
            this.prefix,
            agentId,
            values.toArray(),
        );
    }

    /**
     * This endpoint returns the setting identified by the settingId parameter.
     *
     * @param setting The setting ID
     * @param agentId The agent ID
     *
     * @returns The setting
     */
    async getSetting(setting: string, agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This method updates the setting identified by the settingId parameter.
     *
     * @param setting The setting ID
     * @param agentId The agent ID
     * @param values The new values of the setting
     *
     * @returns The updated setting
     */
    async putSetting(
        setting: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingsOutput> {
        const result = await this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId,
            values,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint deletes the setting identified by the settingId parameter.
     *
     * @param setting The setting ID
     * @param agentId The agent ID
     *
     * @returns The deleted setting
     */
    async deleteSetting(setting: string, agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.delete<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId,
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }
}