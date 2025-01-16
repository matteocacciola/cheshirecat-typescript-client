import {FactoryObjectSettingsOutput} from "../models/api/factories";
import {AbstractEndpoint} from "./abstract";

export class EmbedderEndpoint extends AbstractEndpoint {
    protected prefix = "/embedder";

    async getEmbeddersSettings(): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            this.systemId
        );
    }

    async getEmbedderSettings(embedder: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${embedder}`),
            this.systemId
        );
    }

    async putEmbedderSettings(embedder: string, values: Record<string, any>): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${embedder}`),
            values,
            this.systemId
        );
    }
}