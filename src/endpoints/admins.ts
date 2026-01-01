import { readFile } from "fs/promises";
import FormData from "form-data";
import path from "path";
import * as mime from "mime-types";
import {AbstractEndpoint} from "./abstract";
import {PluginCollectionOutput, PluginToggleOutput} from "../models/api/plugins";

export class AdminsEndpoint extends AbstractEndpoint {
    protected prefix = "/plugins";

    /**
     * This endpoint returns the available plugins, at a system level.
     *
     * @param pluginName The name of the plugin to search for.
     *
     * @returns The available plugins.
     */
    async getAvailablePlugins(pluginName?: string | null): Promise<PluginCollectionOutput> {
        const result = await this.get<PluginCollectionOutput>(
            this.formatUrl("/installed"),
            this.systemId,
            undefined,
            pluginName ? { query: pluginName } : undefined
        );

        return PluginCollectionOutput.convertTags(result);
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

        const fileBuffer = await readFile(pathZip);
        form.append("file", fileBuffer, {
            filename: path.basename(pathZip),
            contentType: mime.contentType(pathZip) || "application/octet-stream"
        });

        const endpoint = this.formatUrl("/install/upload");

        const response = await this.getHttpClient(this.systemId).post(endpoint, form, {
            headers: {
                ...form.getHeaders(),
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
            },
        });
        if (response.status !== 200) {
            throw new Error(`Failed to post data to ${endpoint}: ${response.statusText}`);
        }

        const result = this.deserialize<PluginCollectionOutput>(response.data);
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint installs a plugin from the registry.
     *
     * @param url The URL of the plugin in the registry.
     *
     * @returns The output of the plugin installation.
     */
    async postInstallPluginFromRegistry(url: string): Promise<PluginCollectionOutput> {
        const result = await this.post<PluginCollectionOutput>(
            this.formatUrl("/install/registry"),
            this.systemId,
            { url },
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint retrieves the plugins settings, i.e. the default ones at a system level.
     *
     * @returns The plugins settings.
     */
    async getPluginsSettings(): Promise<PluginCollectionOutput> {
        const result = await this.get<PluginCollectionOutput>(
            this.formatUrl("/system/settings"),
            this.systemId,
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint retrieves the plugin settings, i.e. the default ones at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The plugin settings.
     */
    async getPluginSettings(pluginId: string): Promise<PluginCollectionOutput> {
        const result = await this.get<PluginCollectionOutput>(
            this.formatUrl(`/system/settings/${pluginId}`),
            this.systemId,
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint retrieves the plugin details, at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The plugin details.
     */
    async getPluginDetails(pluginId: string): Promise<PluginCollectionOutput> {
        const result = await this.get<PluginCollectionOutput>(
            this.formatUrl(`/system/details/${pluginId}`),
            this.systemId,
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint deletes a plugin, at a system level.
     *
     * @param pluginId The ID of the plugin.
     *
     * @returns The output of the plugin deletion.
     */
    async deletePlugin(pluginId: string): Promise<PluginCollectionOutput> {
        const result = await this.delete<PluginCollectionOutput>(
            this.formatUrl(`/uninstall/${pluginId}`),
            this.systemId,
        );
        return PluginCollectionOutput.convertTags(result);
    }

    /**
     * This endpoint toggles a plugin.
     *
     * @param pluginId - The ID of the plugin to toggle.
     *
     * @returns The plugin toggle output.
     */
    async putTogglePlugin(pluginId: string): Promise<PluginToggleOutput> {
        return this.put<PluginToggleOutput>(
            this.formatUrl(`/system/toggle/${pluginId}`),
            this.systemId,
        );
    }
}