import {PluginSettingsOutput} from "./nested/plugins";

export class FilterOutput {
    query?: string = null;

    public toArray(): { query: string | null } {
        return {
            query: this.query,
        };
    }
}

export class HookOutput {
    name: string;
    priority: number;

    public toArray(): { name: string, priority: number } {
        return {
            name: this.name,
            priority: this.priority,
        };
    }
}

export class PluginCollectionOutput {
    filters: FilterOutput = new FilterOutput();
    installed: PluginItemOutput[] = [];
    registry: PluginItemRegistryOutput[] = [];

    public toArray(): { filters: { query: string | null }, installed: any[], registry: any[] } {
        return {
            filters: this.filters.toArray(),
            installed: this.installed.map(item => item.toArray()),
            registry: this.registry.map(item => item.toArray()),
        };
    }
}

export class PluginItemOutput {
    id: string;
    name: string;
    description: string;
    authorName: string;
    authorUrl: string;
    pluginUrl: string;
    tags: string;
    thumb: string;
    version: string;
    active: boolean;
    hooks: HookOutput[];
    tools: ToolOutput[];

    public toArray(): { id: string, name: string, description: string, author_name: string, author_url: string, plugin_url: string, tags: string, thumb: string, version: string, active: boolean, hooks: any[], tools: any[] } {
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
            active: this.active,
            hooks: this.hooks.map(item => item.toArray()),
            tools: this.tools.map(item => item.toArray()),
        };
    }
}

export class PluginItemRegistryOutput {
    id: string;
    name: string;
    description: string;
    authorName: string;
    authorUrl: string;
    pluginUrl: string;
    tags: string;
    thumb: string;
    version: string;
    url: string;

    public toArray(): { id: string, name: string, description: string, author_name: string, author_url: string, plugin_url: string, tags: string, thumb: string, version: string, url: string } {
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

export class ToolOutput {
    name: string;

    public toArray(): { name: string } {
        return {
            name: this.name,
        };
    }
}