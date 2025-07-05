import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingOutput, FactoryObjectSettingsOutput} from "../models/api/factories";

export class VectorDatabaseEndpoint extends AbstractEndpoint {
    protected prefix = "/vector_database";

    /**
     * This endpoint returns the settings of all vector databases.
     *
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of all the vector databases
     */
    async getVectorDatabasesSettings(agentId: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            agentId
        );
    }

    /**
     * This endpoint returns the settings of a specific vector database.
     *
     * @param vectorDatabase The name of the vector database to get the settings of
     * @param agentId The ID of the agent to get the settings of
     *
     * @returns The settings of the vector database
     */
    async getVectorDatabaseSettings(vectorDatabase: string, agentId: string): Promise<FactoryObjectSettingOutput> {
        return this.get<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${vectorDatabase}`),
            agentId
        );
    }

    /**
     * This endpoint updates the settings of a specific vector database.
     *
     * @param vectorDatabase The name of the vector database to update the settings of
     * @param agentId The ID of the agent to update the settings of
     * @param values The new settings of the vector database
     *
     * @returns The updated settings of the vector database
     */
    async putVectorDatabaseSettings(
        vectorDatabase: string,
        agentId: string,
        values: Record<string, any>,
    ): Promise<FactoryObjectSettingOutput> {
        return this.put<FactoryObjectSettingOutput>(
            this.formatUrl(`/settings/${vectorDatabase}`),
            agentId,
            values,
        );
    }
}