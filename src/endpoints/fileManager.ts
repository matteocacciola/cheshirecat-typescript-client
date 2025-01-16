import {AbstractEndpoint} from "./abstract";
import {FactoryObjectSettingsOutput} from "../models/api/factories";

export class FileManagerEndpoint extends AbstractEndpoint {
    protected prefix = '/file_manager';

    async getFileManagersSettings(): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl("/settings"),
            this.systemId
        );
    }

    async getFileManagerSettings(fileManager: string): Promise<FactoryObjectSettingsOutput> {
        return this.get<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            this.systemId
        );
    }

    async putFileManagerSettings(fileManager: string, values: Record<string, any>): Promise<FactoryObjectSettingsOutput> {
        return this.put<FactoryObjectSettingsOutput>(
            this.formatUrl(`/settings/${fileManager}`),
            values,
            this.systemId
        );
    }
}