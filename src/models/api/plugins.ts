import {PluginSettingsOutput} from "./nested/plugins";

export class FilterOutput {
    query?: string | null = null;

    public toArray(): object {
        return {
            query: this.query,
        };
    }
}

export class HookOutput {
    name: string;
    priority: number;

    public toArray(): object {
        return {
            name: this.name,
            priority: this.priority,
        };
    }
}

export class ToolOutput {
    name: string;

    public toArray(): object {
        return {
            name: this.name,
        };
    }
}

export class FormOutput {
    name: string;

    public toArray(): object {
        return {
            name: this.name,
        };
    }
}

export class EndpointOutput {
    name: string;
    tags: string[];

    public toArray(): object {
        return {
            name: this.name,
            tags: this.tags,
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
    active: boolean;
    hooks: HookOutput[];
    tools: ToolOutput[];
    forms: FormOutput[];
    endpoints: EndpointOutput[];

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
            active: this.active,
            hooks: this.hooks.map(item => item.toArray()),
            tools: this.tools.map(item => item.toArray()),
            forms: this.forms.map(item => item.toArray()),
            endpoints: this.endpoints.map(item => item.toArray()),
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