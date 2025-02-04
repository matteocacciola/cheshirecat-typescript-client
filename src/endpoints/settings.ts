import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";
import {SettingInput} from "../models/dtos";
import {SettingOutputItem} from "../models/api/settings";

export class SettingsEndpoint extends AbstractEndpoint {
    protected prefix = "/settings";

    /**
     * This endpoint returns the settings of the agent identified by the agentId parameter (multi-agent installations)
     * You can omit the agentId parameter in a single-agent installation. In this case, the settings of the default
     * agent are returned.
     *
     * @param agentId The agent ID
     *
     * @returns The settings of the agent
     */
    async getSettings(agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This method creates a new setting for the agent identified by the agentId parameter (multi-agent installations).
     * You can omit the agentId parameter in a single-agent installation. In this case, the setting is created for the
     * default agent.
     *
     * @param values The values of the setting
     * @param agentId The agent ID
     *
     * @returns The created setting
     */
    async postSetting( values: SettingInput, agentId?: string | null): Promise<SettingOutputItem> {
        return this.post<SettingOutputItem>(
            this.prefix,
            values.toArray(),
            agentId,
        );
    }

    /**
     * This endpoint returns the setting identified by the settingId parameter. The setting must belong to the agent
     * identified by the agentId parameter (multi-agent installations). You can omit the agentId parameter in a
     * single-agent installation. In this case, the setting is looked up in the default agent.
     *
     * @param setting The setting ID
     * @param agentId The agent ID
     *
     * @returns The setting
     */
    async getSetting(setting: string, agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId
        );
    }

    /**
     * This method updates the setting identified by the settingId parameter. The setting must belong to the agent
     * identified by the agentId parameter (multi-agent installations). You can omit the agentId parameter in a
     * single-agent installation. In this case, the setting is updated in the default agent.
     *
     * @param setting The setting ID
     * @param values The new values of the setting
     * @param agentId The agent ID
     *
     * @returns The updated setting
     */
    async putSetting(
        setting: string,
        values: Record<string, any>,
        agentId?: string | null
    ): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            values,
            agentId
        );
    }

    /**
     * This endpoint deletes the setting identified by the settingId parameter. The setting must belong to the agent
     * identified by the agentId parameter (multi-agent installations). You can omit the agentId parameter in a
     * single-agent installation. In this case, the setting is deleted from the default agent.
     *
     * @param setting The setting ID
     * @param agentId The agent ID
     *
     * @returns The deleted setting
     */
    async deleteSetting(setting: string, agentId?: string | null): Promise<FactoryObjectSettingsOutput> {
        return this.delete<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${setting}`),
            agentId
        );
    }
}