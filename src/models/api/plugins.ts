import {PluginSettingsOutput} from "./nested/plugins";
import {convertTags as baseConvertTags} from "../../helpers";

export class FilterOutput {
    query?: string | null = null;

    public toArray(): object {
        return {
            query: this.query,
        };
    }
}

export class PluginCollectionOutput {
    filters: FilterOutput = new FilterOutput();
    installed: PluginItemOutput[] = [];
    registry: PluginItemRegistryOutput[] = [];

    public toArray(): object {
        return {
            filters: this.filters.toArray(),
            installed: this.installed.map(item => item.toArray()),
            registry: this.registry.map(item => item.toArray()),
        };
    }

    static convertTags(obj: PluginCollectionOutput): PluginCollectionOutput {
        if (Array.isArray(obj.installed)) {
            for (const plugin of obj.installed) {
                baseConvertTags(plugin);
            }
        }

        if (Array.isArray(obj.registry)) {
            for (const plugin of obj.registry) {
                baseConvertTags(plugin);
            }
        }

        return obj;
    }
}

export class PluginItemOutput {
    id: string;
    name: string;
    description?: string | null = null;
    authorName?: string | null = null;
    authorUrl?: string | null = null;
    pluginUrl?: string | null = null;
    tags?: string | null = null;
    thumb?: string | null = null;
    version?: string | null = null;
    localInfo: object | null = null;

    public toArray(): object {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            author_name: this.authorName,
            author_url: this.authorUrl,
            plugin_url: this.pluginUrl,
            tags: this.tags,
            thumb: this.thumb,
            version: this.version,
            localInfo: this.localInfo,
        };
    }
}

export class PluginItemRegistryOutput {
    id?: string | null = null;
    name: string;
    description?: string | null = null;
    authorName?: string | null = null;
    authorUrl?: string | null = null;
    pluginUrl?: string | null = null;
    tags?: string | null = null;
    thumb?: string | null = null;
    version?: string | null = null;
    url?: string | null = null;

    public toArray(): object {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            author_name: this.authorName,
            author_url: this.authorUrl,
            plugin_url: this.pluginUrl,
            tags: this.tags,
            thumb: this.thumb,
            version: this.version,
            url: this.url,
        };
    }
}

export interface PluginsSettingsOutput {
    settings: PluginSettingsOutput[];
}

export interface PluginToggleOutput {
    info: string;
}