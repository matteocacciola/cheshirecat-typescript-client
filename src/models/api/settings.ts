export interface SettingDeleteOutput {
    deleted: boolean;
}

export interface SettingOutput {
    name: string;
    value: Record<string, any>;
    category: string;
    settingId: string;
    updatedAt: number | string;
}

export interface SettingOutputItem {
    setting: SettingOutput;
}

export interface SettingsOutputCollection {
    settings: SettingOutput[];
}