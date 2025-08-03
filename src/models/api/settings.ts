export interface SettingDeleteOutput {
    deleted: string;
}

export interface SettingOutputItem {
    setting: Record<string, any>;
}

export interface SettingsOutputCollection {
    settings: Record<string, any>[];
}