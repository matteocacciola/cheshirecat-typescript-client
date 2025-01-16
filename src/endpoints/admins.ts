import {AbstractEndpoint} from "./abstract";
import {TokenOutput} from "../models/api/tokens";
import {AdminOutput, ResetOutput} from "../models/api/admins";
import {PluginCollectionOutput} from "../models/api/plugins";
import fs from "fs";

export class AdminsEndpoint extends AbstractEndpoint {
    protected prefix = "/admins";

    async token(username: string, password: string): Promise<TokenOutput> {
        const httpClient = this.client.getHttpClient().createHttpClient();

        const response = await httpClient.post(this.formatUrl("/auth/token"), {
            username,
            password
        });

        const result = this.deserialize<TokenOutput>(JSON.stringify(response.data));
        this.client.addToken(result.accessToken);

        return result;
    }

    async postAdmin(
        username: string,
        password: string,
        permissions?: Record<string, any>
    ): Promise<AdminOutput> {
        const payload: Record<string, any> = { username, password };
        if (permissions) {
            payload.permissions = permissions;
        }

        return this.postJson<AdminOutput>(
            this.formatUrl("/users"),
            payload,
            this.systemId
        );
    }

    async getAdmins(limit?: number, skip?: number): Promise<AdminOutput[]> {
        const query: Record<string, any> = {};
        if (limit) query.limit = limit;
        if (skip) query.skip = skip;

        const response = await this.getHttpClient(this.systemId).get(
            this.formatUrl("/users"),
            query ? { params: query } : undefined
        );

        return response.data.map((item: any) =>
            this.deserialize<AdminOutput>(JSON.stringify(item))
        );
    }
    
    async getAdmin(adminId: string): Promise<AdminOutput> {
        return this.get<AdminOutput>(this.formatUrl(`/users/${adminId}`), this.systemId);
    }
    
    async putAdmin(
        adminId: string,
        username?: string,
        password?: string,
        permissions?: Record<string, any>
    ): Promise<AdminOutput> {
        const payload: Record<string, any> = {};
        if (username) payload.username = username;
        if (password) payload.password = password;
        if (permissions) payload.permissions = permissions;

        return this.put<AdminOutput>(
            this.formatUrl(`/users/${adminId}`),
            payload,
            this.systemId
        );
    }
    
    async deleteAdmin(adminId: string): Promise<AdminOutput> {
        return this.delete<AdminOutput>(this.formatUrl(`/users/${adminId}`), this.systemId);
    }
    
    async postFactoryReset(): Promise<ResetOutput> {
        return this.postJson<ResetOutput>(
            this.formatUrl("/utils/factory/reset/"),
            {},
            this.systemId
        );
    }
    
    async postAgentCreate(agentId?: string): Promise<ResetOutput> {
        return this.postJson<ResetOutput>(
            this.formatUrl("/utils/agent/create/"),
            {},
            agentId
        );
    }
    
    async postAgentReset(agentId?: string): Promise<ResetOutput> {
        return this.postJson<ResetOutput>(
            this.formatUrl("/utils/agent/reset/"),
            {},
            agentId
        );
    }
    
    async postAgentDestroy(agentId?: string): Promise<ResetOutput> {
        return this.postJson<ResetOutput>(
            this.formatUrl("/utils/agent/destroy/"),
            {},
            agentId
        );
    }
    
    async getAvailablePlugins(pluginName?: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl("/plugins"),
            this.systemId,
            undefined,
            pluginName ? { query: pluginName } : undefined
        );
    }

    // create a function to open a file and pass the file contents to postMultipart
    
    async postInstallPluginFromZip(pathZip: string): Promise<PluginCollectionOutput> {
        return this.postMultipart<PluginCollectionOutput>(
            this.formatUrl("/plugins/upload"),
            [
                {
                    name: "file",
                    contents: fs.createReadStream(pathZip),
                    filename: pathZip
                }
            ],
            this.systemId
        );
    }
    
    async postInstallPluginFromRegistry(url: string): Promise<PluginCollectionOutput> {
        return this.postJson<PluginCollectionOutput>(
            this.formatUrl("/plugins/upload/registry"),
            { url },
            this.systemId
        );
    }
    
    async getPluginsSettings(): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl("/plugins/settings"),
            this.systemId
        );
    }
    
    async getPluginSettings(pluginId: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl(`/plugins/settings/${pluginId}`),
            this.systemId
        );
    }
    
    async getPluginDetails(pluginId: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl(`/plugins/${pluginId}`),
            this.systemId
        );
    }
    
    async deletePlugin(pluginId: string): Promise<PluginCollectionOutput> {
        return this.delete<PluginCollectionOutput>(
            this.formatUrl(`/plugins/${pluginId}`),
            this.systemId
        );
    }
}