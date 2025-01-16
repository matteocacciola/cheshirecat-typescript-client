export interface PluginSchemaSettings {
    title: string;
    type: string;
    properties: Record<string, PropertySettingsOutput>;
}

export interface PluginSettingsOutput {
    name: string;
    scheme?: PluginSchemaSettings;
    value: Record<string, any>;
}

export interface PropertySettingsOutput {
    default: any;
    extra?: Record<string, any>;
    title: string;
    type: string;
}