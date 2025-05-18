import { readFile } from "fs/promises";
import FormData from "form-data";
import path from "path";
import * as mime from "mime-types";
import {AbstractEndpoint} from "./abstract";
import {TokenOutput} from "../models/api/tokens";
import {AdminOutput, ResetOutput} from "../models/api/admins";
import {PluginCollectionOutput} from "../models/api/plugins";

export class AdminsEndpoint extends AbstractEndpoint {
    protected prefix = "/admins";

    /**
     * This endpoint is used to get a token for the user. The token is used to authenticate the user in the system. When
     * the token expires, the user must request a new token.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     *
     * @returns The token for the user.
     */
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

    /**
     * This endpoint is used to create a new admin user in the system.
     *
     * @param username The username of the new admin user.
     * @param password The password of the new admin user.
     * @param permissions The permissions of the new admin user.
     *
     * @returns The new admin user.
     */
    async postAdmin(
        username: string,
        password: string,
        permissions?: Record<string, string[]> | null,
    ): Promise<AdminOutput> {
        const payload: Record<string, any> = { username, password };
        if (permissions) {
            payload.permissions = permissions;
        }

        return this.post<AdminOutput>(
            this.formatUrl("/users"),
            this.systemId,
            payload,
        );
    }

    /**
     * This endpoint is used to get a list of admin users in the system.
     *
     * @param limit The maximum number of admin users to return.
     * @param skip The number of admin users to skip.
     *
     * @returns A list of admin users.
     */
    async getAdmins(limit?: number | null, skip?: number | null): Promise<AdminOutput[]> {
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

    /**
     * This endpoint is used to get a specific admin user in the system.
     *
     * @param adminId The ID of the admin user.
     *
     * @returns The admin user.
     */
    async getAdmin(adminId: string): Promise<AdminOutput> {
        return this.get<AdminOutput>(this.formatUrl(`/users/${adminId}`), this.systemId);
    }

    /**
     * This endpoint is used to update an admin user in the system.
     *
     * @param adminId The ID of the admin user.
     * @param username The new username of the admin user.
     * @param password The new password of the admin user.
     * @param permissions The new permissions of the admin user.
     *
     * @returns The updated admin user.
     */
    async putAdmin(
        adminId: string,
        username?: string | null,
        password?: string | null,
        permissions?: Record<string, string[]> | null
    ): Promise<AdminOutput> {
        const payload: Record<string, any> = {};
        if (username) payload.username = username;
        if (password) payload.password = password;
        if (permissions) payload.permissions = permissions;

        return this.put<AdminOutput>(
            this.formatUrl(`/users/${adminId}`),
            this.systemId,
            payload,
        );
    }

    /**
     * This endpoint is used to delete an admin user in the system.
     *
     * @param adminId The ID of the admin user.
     *
     * @returns The deleted admin user.
     */
    async deleteAdmin(adminId: string): Promise<AdminOutput> {
        return this.delete<AdminOutput>(this.formatUrl(`/users/${adminId}`), this.systemId);
    }

    /**
     * This endpoint is used to reset the system to factory settings. This will delete all data in the system.
     *
     * @returns The output of the reset operation.
     */
    async postFactoryReset(): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/utils/factory/reset/"),
            this.systemId,
        );
    }

    /**
     * This endpoint is used to retrieve all the agents in the system.
     *
     * @returns A list of agent IDs.
     */
    async getAgents(): Promise<string[]> {
        return this.get<string[]>(
            this.formatUrl("/utils/agents/"),
            this.systemId,
        );
    }

    /**
     * This endpoint is used to create a new agent from scratch.
     *
     * @param agentId The ID of the agent to create.
     *
     * @returns The output of the create operation.
     */
    async postAgentCreate(agentId: string): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/utils/agent/create/"),
            agentId,
        );
    }

    /**
     * This endpoint is used to reset the agent to factory settings. This will delete all data in the agent.
     *
     * @param agentId The ID of the agent to reset.
     *
     * @returns The output of the reset operation.
     */
    async postAgentReset(agentId: string): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/utils/agent/reset/"),
            agentId
        );
    }

    /**
     * This endpoint is used to reset the agent to factory settings. This will delete all data in the agent.
     *
     * @param agentId The ID of the agent to reset.
     *
     * @returns The output of the reset operation.
     */
    async postAgentDestroy(agentId: string): Promise<ResetOutput> {
        return this.post<ResetOutput>(
            this.formatUrl("/utils/agent/destroy/"),
            agentId
        );
    }

    /**
     * This endpoint returns the available plugins, at a system level.
     *
     * @param pluginName The name of the plugin to search for.
     *
     * @returns The available plugins.
     */
    async getAvailablePlugins(pluginName?: string | null): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl("/plugins"),
            this.systemId,
            undefined,
            pluginName ? { query: pluginName } : undefined
        );
    }

    // create a function to open a file and pass the file contents to postMultipart

    /**
     * This endpoint installs a plugin from a ZIP file.
     *
     * @param pathZip The path to the ZIP file.
     *
     * @returns The output of the plugin installation.
     */
    async postInstallPluginFromZip(pathZip: string): Promise<PluginCollectionOutput> {
        const form = new FormData();
        const finalZipPath = path.basename(pathZip);

        const fileBuffer = await readFile(finalZipPath);
        form.append("file", fileBuffer, {
            filename: finalZipPath,
            contentType: mime.contentType(finalZipPath) || "application/octet-stream"
        });

        const response = await this.getHttpClient(this.systemId).post(this.formatUrl("/plugins/upload"), form, {
            headers: {
                ...form.getHeaders(),
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            },
        });

        return this.deserialize<PluginCollectionOutput>(response.data);
    }

    /**
     * This endpoint installs a plugin from the registry.
     *
     * @param url The URL of the plugin in the registry.
     *
     * @returns The output of the plugin installation.
     */
    async postInstallPluginFromRegistry(url: string): Promise<PluginCollectionOutput> {
        return this.post<PluginCollectionOutput>(
            this.formatUrl("/plugins/upload/registry"),
            this.systemId,
            { url },
        );
    }

    /**
     * This endpoint retrieves the plugins settings, i.e. the default ones at a system level.
     *
     * @returns The plugins settings.
     */
    async getPluginsSettings(): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl("/plugins/settings"),
            this.systemId,
        );
    }

    /**
     * This endpoint retrieves the plugin settings, i.e. the default ones at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The plugin settings.
     */
    async getPluginSettings(pluginId: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl(`/plugins/settings/${pluginId}`),
            this.systemId,
        );
    }

    /**
     * This endpoint retrieves the plugin details, at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The plugin details.
     */
    async getPluginDetails(pluginId: string): Promise<PluginCollectionOutput> {
        return this.get<PluginCollectionOutput>(
            this.formatUrl(`/plugins/${pluginId}`),
            this.systemId,
        );
    }

    /**
     * This endpoint deletes a plugin, at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The output of the plugin deletion.
     */
    async deletePlugin(pluginId: string): Promise<PluginCollectionOutput> {
        return this.delete<PluginCollectionOutput>(
            this.formatUrl(`/plugins/${pluginId}`),
            this.systemId,
        );
    }
}