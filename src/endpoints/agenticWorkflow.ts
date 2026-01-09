import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class AgenticWorkflowEndpoint extends AbstractEndpoint {
    protected prefix = "/agentic_workflow";

    /**
     * This endpoint returns the settings of all the agentic workflows. It is used to get the settings of all the
     * agentic workflows that are available in the agent specified by the agentId parameter.
     *
     * @param agentId The ID of the agent to get the agentic workflows settings from.
     *
     * @returns The settings of all the agentic workflows.
     */
    async getAgenticWorkflowsSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        const result = await this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
        return FactoryObjectSettingsOutput.convertSchemes(result);
    }

    /**
     * This endpoint returns the settings of a specific agentic workflow. It is used to get the settings of a
     * specific agentic workflow that is available in the agent specified by the agentId parameter.
     *
     * @param agenticWorkflow The ID of the agentic workflow to get the settings from.
     * @param agentId The ID of the agent to get the agentic workflow settings from.
     *
     * @returns The settings of the specified agentic workflow.
     */
    async getAgenticWorkflowSettings(
        agenticWorkflow: string,
        agentId: string
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${agenticWorkflow}`),
            agentId
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }

    /**
     * This endpoint updates the settings of a specific agentic workflow. It is used to update the settings of a
     * specific agentic workflow that is available in the agent specified by the agentId parameter.
     *
     * @param agenticWorkflow The ID of the agentic workflow to update the settings of.
     * @param agentId The ID of the agent to update the agentic workflow settings in.
     * @param values The new values of the settings.
     *
     * @returns The updated settings of the specified agentic workflow.
     */
    async putAgenticWorkflowSettings(
        agenticWorkflow: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingOutput> {
        const result = await this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${agenticWorkflow}`),
            agentId,
            values,
        );
        return FactoryObjectSettingOutput.convertScheme(result);
    }
}