export interface FactoryObjectSettingOutput {
    name: string;
    value: Record<string, any>;
    scheme?: Record<string, any> | null;
}

export interface FactoryObjectSettingsOutput {
    settings: FactoryObjectSettingOutput[];
    selectedConfiguration: string;
}