export interface PluginSchemaSettings {
    title: string;
    type: string;
    properties: Record<string, PropertySettingsOutput>;
}

export interface PluginSettingsOutput {
    name: string;
    scheme?: PluginSchemaSettings | null;
    value: Record<string, any>;
}

export interface PropertySettingsOutput {
    default: any;
    extra?: Record<string, any> | null;
    title?: string | null;
    type?: string | null;
}