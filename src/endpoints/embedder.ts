import {FactoryObjectSettingsOutput} from "../models/api/factories";
import {AbstractEndpoint} from "./abstract";

export class EmbedderEndpoint extends AbstractEndpoint {
    protected prefix = "/embedder";

    /**
     * This endpoint returns the settings of all embedders. Embedders are set to a system level, so usable by all
     * the agents in the system.
     *
     * @returns The settings of all the embedders
     */
    async getEmbeddersSettings(): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            this.systemId,
        );
    }

    /**
     * This endpoint returns the settings of a specific embedder. Embedders are set to a system level, so usable by all
     * the agents in the system.
     *
     * @param embedder The name of the embedder to get the settings of
     *
     * @returns The settings of the embedder
     */
    async getEmbedderSettings(embedder: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${embedder}`),
            this.systemId,
        );
    }

    /**
     * This endpoint updates the settings of a specific embedder. Embedders are set to a system level, so usable by all
     * the agents in the system.
     *
     * @param embedder The name of the embedder to update the settings of
     * @param values The new settings of the embedder
     *
     * @returns The updated settings of the embedder
     */
    async putEmbedderSettings(embedder: string, values: Record<string, any>): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${embedder}`),
            this.systemId,
            values,
        );
    }
}