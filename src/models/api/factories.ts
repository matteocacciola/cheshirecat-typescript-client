export class FactoryObjectSettingOutput {
    name: string;
    value: Record<string, any>;
    scheme?: Record<string, any> | null;

    static convertScheme(obj: FactoryObjectSettingOutput): FactoryObjectSettingOutput {
        // if obj.scheme is an empty object, set it to null
        if (obj.scheme && Object.keys(obj.scheme).length === 0) {
            obj.scheme = null;
        }
        return obj;
    }
}

export class FactoryObjectSettingsOutput {
    settings: FactoryObjectSettingOutput[];
    selectedConfiguration: string;

    static convertSchemes(obj: FactoryObjectSettingsOutput): FactoryObjectSettingsOutput {
        if (obj.settings) {
            obj.settings = obj.settings.map(FactoryObjectSettingOutput.convertScheme);
        }
        return obj;
    }
}